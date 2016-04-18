#!/usr/bin/env node

var Hapi = require('hapi');
var Joi = require('joi');

var path = require('path');

var config = process.env.NODE_ENV === 'production' ? require('./configuration-release') : require('./configuration');

var events = require('./api/events');
var applicants = require('./api/applicants');

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
    path: '/api/events/{id}/closed',
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
        path: '/admin/{param*}',
        handler: {
            directory: {
                path: path.resolve(path.join(__dirname, '../adminapp'))
            }
        }
    });

    server.route({ method: 'GET', path: '/admin/home', handler: (req, rep) => { rep.redirect('/admin'); } });
    server.route({ method: 'GET', path: '/admin/event*', handler: (req, rep) => { rep.redirect('/admin'); } });

    server.route({
        method: 'GET',
        path: '/{param*}',
        handler: {
            directory: {
                path: path.resolve(path.join(__dirname, '../webapp'))
            }
        }
    });

    server.route({ method: 'GET', path: '/home', handler: (req, rep) => { rep.redirect('/'); } });
    server.route({ method: 'GET', path: '/success', handler: (req, rep) => { rep.redirect('/'); } });
});


dbConnection.initialiseConnection().then(server.start(function () {
    console.log('Server listening on port ' + port);
}));
