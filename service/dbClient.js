var dbConn = require('./dbConnection');

function visitorsTable() {
    return dbConn.database.collection('visitors')
}

module.exports = {
    addVisitor: visitor => {
        return visitorsTable()
            .insertOne(visitor)
            .then( result => {
                return result.ops[0];
            });
    },

    getVisitors: () => {
        return visitorsTable().find().toArray();
    },

    getVisitorById: id => {
        return visitorsTable().findOne({_id: dbConn.ObjectID(id)});
    }
};
