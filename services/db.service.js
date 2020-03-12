
const MongoClient = require('mongodb').MongoClient;
// const config = require('../config')
require('dotenv').config()

var dbConn = null;

async function getCollection(collectionName) {//returns collection by name
    const db = await connect()
    return db.collection(collectionName);
}
async function connect() {//returns db by db name
    if (dbConn) return dbConn;
    try {
        // const client = await MongoClient.connect(config.dbURL, { useUnifiedTopology: true });//useNewUrlParser / useUnifiedTopology
        // console.log("process.env.REACT_APP_DBURL: " + process.env.REACT_APP_DBURL)
        const client = await MongoClient.connect(process.env.REACT_APP_DBURL, { useUnifiedTopology: true });
        const db = client.db(config.dbName);
        const db = client.db(process.env.REACT_APP_DBNAME);
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




