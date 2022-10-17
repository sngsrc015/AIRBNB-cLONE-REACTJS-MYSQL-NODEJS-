var multer=require('multer');
const {uuid} =require('uuidv4');
const { v4: uuidv4 } = require('uuid')

var serverpath=multer.diskStorage({

    destination:(req,file,path)=>{
        path(null,'public/images');
    },
    filename:(req,file,path)=>{
var ext=file.originalname.substring(file.originalname.lastIndexOf("."))
var filename=uuid()+ext
console.log(filename)
req['ufilename']=filename
        path(null,filename);
    },
});

var upload=multer({storage:serverpath});

module.exports=upload;