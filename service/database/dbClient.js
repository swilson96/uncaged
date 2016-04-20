var Promise = require('promise');
var dbConn = require('./dbConnection');

function events() {
    return dbConn.database.collection('events');
}

module.exports = {
    addEvent: event => {
        return events()
            .insertOne(event);
    },

    getEvents: () => {
        return events().find().toArray();
    },

    getEvent: (id) => {
        return new Promise(function (resolve, reject) {
            events().find({"_id": dbConn.ObjectID(id)}).limit(1).next((err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });
    },

    closeEvent: (id) => {
        return events().update(
            {_id: dbConn.ObjectID(id)},
            {
                $set: {open: false}
            });
    },

    openEvent: (id) => {
        return events().update(
            {_id: dbConn.ObjectID(id)},
            {
                $set: {open: true}
            });
    },

    addApplicant: (id, applicant) => {
        return events().update(
            {_id: dbConn.ObjectID(id)},
            {
                $push: { applicants: applicant }
            });
    },
};
