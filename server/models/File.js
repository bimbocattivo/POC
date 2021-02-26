const mongoose=require('mongoose');
const Schema=mongoose.Schema;


const FileSchema = new Schema({
 fileName:String,
 fileType:String,
 filePath:String,
 dataSaved:[Number],
 updated: {
     type: Date, 
     default:Date.now()
 }   
})

module.exports=mongoose.model('File',FileSchema);