#!/usr/bin/env node

var Hapi = require('hapi');
var Joi = require('joi');

var path = require('path');

var config = process.env.NODE_ENV === 'production' ? require('./configuration-release') : require('./configuration');

var universities = require('./api/universities');
var applicants = require('./api/applicants');

var admin = require('./admin/applicants');

var dbConnection = require('./database/dbConnection');

var port = process.env.PORT || parseInt(config.port, 10) || 4000;

const server = new Hapi.Server();
server.connection({ port: port });

server.route({
    method: 'GET',
    path: '/api/universities',
    handler: universities.list
});

server.route({
    method: 'POST',
    path: '/api/universities',
    config: {
        validate: {
            payload: {
                name: Joi.string().required()
            }
        },
        handler: universities.new
    }
});

server.route({
    method: 'GET',
    path: '/api/applicants',
    handler: applicants.list
});

server.route({
    method: 'POST',
    path: '/api/applicants',
    config: {
        validate: {
            payload: {
                name: Joi.string().required(),
                email: Joi.string().required(),
                university: Joi.string()
            }
        },
        handler: applicants.new
    }
});


server.register(require('inert'), (err) => {
    server.route({
        method: 'GET',
        path: '/{param*}',
        handler: {
            directory: {
                path: path.resolve(path.join(__dirname, '../build'))
            }
        }
    });

    server.register(require('vision'), (err) => {

        server.views({
            engines: {jade: require('jade')},
            path: __dirname + '/views',
            compileOptions: {
                pretty: true
            }
        });

        server.route({
            method: 'GET',
            path: '/admin/applicants',
            handler: admin.list
        });

        dbConnection.initialiseConnection().then(server.start(function () {
            console.log('Server listening on port ' + port);
        }));
    });

});
