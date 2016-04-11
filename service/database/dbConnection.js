var Promise = require('promise'),
    MongoDb = require('mongodb'),
    configuration = require('../configuration');

function initialiseConnection() {
    return Promise.denodeify(MongoDb.MongoClient.connect)(configuration.databaseUrl).then(function(db) {
        console.log("Connected correctly to MongoDB database.");
        module.exports.database = db;
    });
}

module.exports = {
    initialiseConnection: initialiseConnection,
    ObjectID: MongoDb.ObjectID
};
