var express = require('express');
var router = express.Router();
var pool=require('./pool')
const config = require("../nodemon.json");
const jwt = require("jsonwebtoken");
/* GET home page. */
router.post('/checkadminlogin', function(req, res, next) {
  console.log(req.body)
  pool.query('select * from superlogin where emailid=? and password=?',[req.body.emailid,req.body.password],function(error,result){
    console.log(error,result)
    if(error){
      return res.status(500).json({status:false,error:error})
  }
  else {
    
    if(result.length==1)
    { 
      // const token = jwt.sign({emailid: result[0].emailid }, config.secret, {
      //   expiresIn: "7d",
      // });

      return res.status(200).json({status:true,data:result[0],});
  }
  else    { return res.status(200).json({status:true,data:result[0]});

  }}
  
  


})});

module.exports = router;
