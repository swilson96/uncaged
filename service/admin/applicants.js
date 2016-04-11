var dbClient = require('../database/dbClient');

module.exports = {
    /*
     * /applicants GET
     */
    list: (request, reply) => {
        dbClient.getApplicants().then( result => {
            reply.view('applicants', { applicants: result });
        });
    }
};
