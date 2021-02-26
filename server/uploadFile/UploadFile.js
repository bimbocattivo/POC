const multer =require('multer');
const path=require('path')

const MIME_TYPE_MAP={
    'file/csv':'csv',
    'file/json':'json'
}


const uploadFile=multer({
    limit :2*1045*1024*1024,
    storage:multer.diskStorage({
        destination: (req,res,cb)=>{
            cb(null, path.join(__dirname,'../allFiles/uploads'))
        },
        filename: function (req, file, cb) {
            console.log('your are in ***** MULTER ****upload file',file)
            cb(null,file.originalname);
            //cb(null, file.filename + '-' + Date.now())
        }
    })
})

module.exports=uploadFile;