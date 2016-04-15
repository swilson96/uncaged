var dbClient = require('../database/dbClient');

module.exports = {
    /*
     * /event/{id}/applicants GET
     */
    list: (request, reply) => {
        dbClient.getEvent(request.params.id).then( result => {
            reply(result.applicants);
        });
    },

    /*
     * /event/{id}/applicants POST
     */
    new: (request, reply) => {
        var applicant = request.payload;
        if (!applicant.time) {
            applicant.time = new Date();
        }
        dbClient.addApplicant(request.params.id, applicant).then(result => {
            reply(result);
        });
    }
};
