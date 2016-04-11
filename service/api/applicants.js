var dbClient = require('../database/dbClient');

module.exports = {
    /*
     * /applicants GET
     */
    list: (request, reply) => {
        dbClient.getApplicants().then( result => {
            reply(result);
        });
    },

    /*
     * /applicants POST
     */
    new: (request, reply) => {
        dbClient.addApplicant(request.payload).then( result => {
            reply(result)
        });
    }
};
