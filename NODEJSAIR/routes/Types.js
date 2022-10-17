var express = require('express');
var router = express.Router();
var pool=require('./pool');
var upload=require('./multer');


/* insert city image. */
router.post('/addproperty',upload.single('propertyicon'), function(req, res, next) {
    pool.query('insert IGNORE into typesofproperties (propertytype,propertyicon) values (?,?)',[req.body.propertytype,req.file.originalname],function(error,result){
        if(error){
            return res.status(500).json({status:false,error:error})
        }
        else{
           return res.status(200).json({status:true})
        }
    })
   });

   //* insert city image. */
   router.post('/addsubtypes', function(req, res, next) {
       pool.query('insert IGNORE into subtype  (propertyid,subpropertyname,description) values(?,?,?)',[req.body.propertyid,req.body.subpropertyname,req.body.description],function(error,result){

        
        
        if(error){

               return res.status(500).json({status:false,error:error})
           }
           else{

            
            console.log(req.body)
              return res.status(200).json({status:true})
           }
       })
      });
   
   



   router.get('/displayproperty', function(req, res, next) {
    pool.query('select *from typesofproperties',function(error,result){
        if(error){
            return res.status(500).json({status:false,error:error})
        }
        else{
           return res.status(200).json({status:true,data:result})
        }
    })
   });



   module.exports = router;