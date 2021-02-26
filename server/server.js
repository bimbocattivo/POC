const express=require('express');
const cons=require('consolidate')
const dust=require('dustjs-helpers')
const {pg,Client}=require('pg')
const bodyParser =require('body-parser')
const path =require('path')
const conDB=require('./config/pgDb')

const app=express();
/*
const connectionString ='postgres://demoDB:admin@localhost:5400/demoDatabase';
const client = new Client({
    connectionString: connectionString
});

console.log(client.connect(),'PostgreSql conneccted!!')
*/

app.engine('dust',cons.dust);

app.set('view engine', 'dust');
app.set('view', __dirname+'/views');

app.use(express.static(path.join(__dirname,'public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.use('/api/data', require('./routes/api/DataSet'));

const query = `
CREATE TABLE DataSet (
    id SERIAL PRIMARY KEY,
    fileName VARCHAR(255),
    data TEXT []
);
`;
const query1 = `
CREATE TABLE Admin (
    email varchar,
    firstName varchar,
    lastName varchar,
    age int
);
`;

app.get('/c', function (req, res, next) {
    conDB.query(query, (err, res) => {
        if (err) {
            console.error(err.message);
            return;
        }
        console.log('Table is successfully created');
        conDB.end();
    });
});

//const conString='postgresql://demoDB:admin@database.server.com:5400/demoDatabase';
/*
const client = new Client({
    user: 'demoDB',
    host: 'localhost',
    database: 'demoDatabase',
    password: 'admin',
    port: 5400,
});
const client1 = new Client();

console.log(client1.connect(),'PostgreSql conneccted!!')
*/


app.get('/', function(req,res){
    console.log('PostgreSql test works!!')
})

const PORT =process.env.PORT ||5000;

app.listen(PORT,()=>console.log(`Server started on port ${PORT}`))