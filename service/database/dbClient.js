var dbConn = require('./dbConnection');

function universities() {
    return dbConn.database.collection('universities')
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
    }
};
