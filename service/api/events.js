var dbClient = require('../database/dbClient');

module.exports = {
    /*
     * /events GET
     */
    list: (request, reply) => {
        dbClient.getEvents().then( result => {
            reply(result);
        });
    },

    /*
     * /events/{id} GET
     */
    get: (request, reply) => {
        dbClient.getEventById(request.params.id).then( result => {
            reply(result);
        });
    },

    /*
     * /events POST
     */
    new: (request, reply) => {
        var event = request.payload;
        if (event.open == null || event.open == undefined) {
            event.open = true;
        }
        dbClient.addEvent(event).then( result => {
            reply(result).code(201);
        });
    },

    /*
     * /events/{id}/closed PUT
     */
    close: (request, reply) => {
        console.log(request.params.id);
        dbClient.closeEvent(request.params.id).then( result => {
            reply(result);
        });
    },

    /*
     * /events/{id}/open PUT
     */
    open: (request, reply) => {
        dbClient.openEvent(request.params.id).then( result => {
            reply(result);
        });
    }
};
