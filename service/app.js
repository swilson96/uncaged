#!/usr/bin/env node

var Hapi = require('hapi');
var Joi = require('joi');

var path = require('path');

var config = process.env.NODE_ENV === 'production' ? require('./configuration-release') : require('./configuration');

var events = require('./api/events');
var applicants = require('./api/applicants');

var admin = require('./admin/applicants');

var dbConnection = require('./database/dbConnection');

var port = process.env.PORT || parseInt(config.port, 10) || 4000;

const server = new Hapi.Server();
server.connection({ port: port });

server.route({
    method: 'GET',
    path: '/api/events',
    handler: events.list
});

server.route({
    method: 'GET',
    path: '/api/events/{id}',
    handler: events.get
});

server.route({
    method: 'PUT',
    path: '/api/events/{id}/close',
    handler: events.close
});

server.route({
    method: 'PUT',
    path: '/api/events/{id}/open',
    handler: events.open
});

server.route({
    method: 'POST',
    path: '/api/events',
    config: {
        validate: {
            payload: {
                name: Joi.string().required(),
                date: Joi.date().required()
            }
        },
        handler: events.new
    }
});

server.route({
    method: 'GET',
    path: '/api/event/{id}/applicants',
    handler: applicants.list
});

server.route({
    method: 'POST',
    path: '/api/event/{id}/applicants',
    config: {
        validate: {
            payload: {
                name: Joi.string().required(),
                email: Joi.string().required()
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
                path: path.resolve(path.join(__dirname, '../webapp'))
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
