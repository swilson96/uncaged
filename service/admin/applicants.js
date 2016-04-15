var dbClient = require('../database/dbClient');

module.exports = {
    /*
     * /applicants GET
     */
    list: (request, reply) => {
        dbClient.getEvents().then( result => {
            reply.view('applicants', { events: result });
        });
    }
};
