var dbConn = require('./dbConnection');

function universities() {
    return dbConn.database.collection('universities');
}

function applicants() {
    return dbConn.database.collection('applicants');
}

module.exports = {
    addUniversity: uni => {
        return universities()
            .insertOne(uni)
            .then( result => {
                return result.ops[0];
            });
    },

    getUniversities: () => {
        return universities().find().toArray();
    },

    addApplicant: applicant => {
        return applicants()
            .insertOne(applicant)
            .then( result => {
                return result.ops[0];
            });
    },

    getApplicants: () => {
        return applicants().find().toArray();
    }
};
