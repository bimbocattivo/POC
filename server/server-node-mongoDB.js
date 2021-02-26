const express=require('express');
const conDB=require('./config/db')
const bodyParser =require('body-parser')
const path =require('path')
const cors = require('cors')
const app =express();

//connection to db 
conDB();
app.use(express.json());
//app.use(bodyParser.json({extended:false}));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// init middleware 

//app.use(bodyParser.json());


// create routes
app.use('/api/data', require('./routes/api/data'));
app.use('/allFiles/uploads', express.static(path.join('allFiles','uploads')));

const PORT =process.env.PORT ||5000;

app.listen(PORT,()=>console.log(`Server started on port ${PORT}`))

