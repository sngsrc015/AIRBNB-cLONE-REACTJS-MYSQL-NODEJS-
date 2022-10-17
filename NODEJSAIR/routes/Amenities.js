var express = require('express');
var router = express.Router();
var pool=require('./pool');
var upload=require('./multer');


/* insert city image. */
router.post('/addamenities', function(req, res, next) {
    pool.query('insert IGNORE into amenities  set ?',[req.body],function(error,result){
        if(error){
            return res.status(500).json({status:false,error:error})
        }
        else{
           return res.status(200).json({status:true})
        }
    })
   });

   //* insert city image. */
   router.post('/addoptions',upload.single('ampicture'), function(req, res, next) {
       pool.query('insert into amenitiesoptions(amenitiesid,amenitiesname,ampicture)values(?,?,?)',[req.body.amenitiesid,req.body.amenitiesname,req.ufilename],function(error,result){
        if(error){
               console.log(error)
               return res.status(500).json({status:false,error:error})
           }
           else{
              return res.status(200).json({status:true})
           }
       })
      });



   
   



   router.get('/displayamenities', function(req, res, next) {
    pool.query('select *from amenities',function(error,result){
        if(error){
            return res.status(500).json({status:false,error:error})
        }
        else{
           return res.status(200).json({status:true,data:result})
        }
    })
   });



   router.get('/displayallamenities_vendor', function (req, res) {
    pool.query("select ao.*, (select amenities from amenities a where a.amenitiesid=ao.amenitiesid ) as an,GROUP_CONCAT(JSON_OBJECT('amenitiesname',ao.amenitiesname,'amenitiesid',ao.amenitiesid,'ampicture',ao.ampicture,'optionsid',ao.optionsid)) as optionlist from amenitiesoptions ao group by ao.amenitiesid", function (error, result) {
        if (error) {
            console.log(error)
            return res.status(500).json({ status: false, error: error })
        }
        else {
            console.log(result)
            return res.status(200).json({ status: true ,data:result})
        }
    })
})



   module.exports = router;