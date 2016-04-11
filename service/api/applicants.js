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
        var applicant = request.payload;
        if (!applicant.time) {
            applicant.time = new Date();
        }
        dbClient.addApplicant(applicant).then(result => {
            reply(result);
        });
    }
};
