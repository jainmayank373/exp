const  multer = require('multer');
const path =  require('path');

const fileStorage  = multer.diskStorage({
    destination:(req,file,cb)=>{
            cb(null,'routes/files');
    },
    filename:(req,file,cb)=>{
            cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});


const fileFilter =  (req,filename,cb)=>{

    if(!filename.originalname.match(/\.(jpg)$/))
        {
                cb(new Error("File name not matched"));
        }
            cb(null,true);
}

const upload = multer({storage:fileStorage,fileFilter:fileFilter})
module.exports = upload;