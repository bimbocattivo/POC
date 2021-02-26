const {Client}=require('pg');

/*
const conDB = new Client({
    user: 'postgres',
    host: 'localhost:5400',
    database: 'demoDatabase',
    password: 'admin',
    port: 5400,
});
*/

const connectionString = 'postgress://postgres:admin@localhost:5400/demoDatabase';
const conDB = new Client({
    connectionString: connectionString
});
conDB.connect();


module.exports=conDB;