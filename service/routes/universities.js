var dbClient = require('../database/dbClient');

module.exports = {
    /*
     * /universities GET
     */
    list: (request, reply) => {
        dbClient.getUniversities().then( result => {
            reply(result);
        });
    },

    /*
     * /universities POST
     */
    new: (request, reply) => {
        dbClient.addUniversity(request.payload).then( result => {
            reply(result)
        });
    }
};
