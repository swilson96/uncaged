#!/usr/bin/env node

var Hapi = require('hapi');
var Joi = require('joi');

var path = require('path');

var config = process.env.NODE_ENV === 'production' ? require('./configuration-release') : require('./configuration');

var universities = require('./routes/universities');
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


    dbConnection.initialiseConnection().then(server.start(function () {
        console.log('Server listening on port ' + port);
    }));
});
