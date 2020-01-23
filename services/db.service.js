
const MongoClient = require('mongodb').MongoClient;
const config = require('../config')

var dbConn = null;

async function getCollection(collectionName) {//returns collection by name
    const db = await connect()
    return db.collection(collectionName);
}
async function connect() {//returns db by db name
    if (dbConn) return dbConn;
    try {
        const client = await MongoClient.connect(config.dbURL, { useUnifiedTopology: true });//useNewUrlParser / useUnifiedTopology
        const db = client.db(config.dbName);
        dbConn = db;
        return db;
    } catch (err) {
        console.log('Cannot Connect to DB', err)
        throw err;
    }
}
module.exports = {
    getCollection
}




