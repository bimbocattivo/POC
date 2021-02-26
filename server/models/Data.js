const mongoose=require('mongoose');
const Schema=mongoose.Schema;


const DataSchema = new Schema({
 dataType:String,
 filePath:String,
 dataSaved:[Number],
 updated: {
     type: Date, 
     default:Date.now()
 }   
})

module.exports=mongoose.model('data',DataSchema);