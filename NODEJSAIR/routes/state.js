/* eslint-disable default-case */
var express = require("express");
var router = express.Router();
var pool = require("./pool");
var upload = require("./multer");
var fs = require("fs");

/* insert city image. */
router.post(
  "/addcitypicture",
  upload.any(),
  
  function (req, res, next) {
    console.log(req.body)
    var temp = {};
    var i = 0;
    req.files.map((item, index) => {
      temp[i] = item.filename;
      i++;
    });
    pool.query(
      "insert into cities (stateid,cityname,picture,price,rating,date,status) values (?,?,?,?,?,?,?)",
      [req.body.stateid, req.body.cityname, JSON.stringify(temp),req.body.price,req.body.rating,req.body.date,req.body.status],
      function (error, result) {
        if (error) {
          
          console.log(error)
          return res.status(500).json({ status: false, error: error });
        } else {
          console.log(req.body)

          return res.status(200).json({ status: true });
        }
      }
    );
  }
);

/*GET All city*/
router.post("/displaycity", function (req, res, next) {
  console.log(req.body)
  var q="select C.*,(select S.statename from states S where S.stateid=C.stateid) as statename from cities C where C.cityname like '%"+req.body.cityname+"%'";
  pool.query(
    q,
    function (error, result) {
      if (error) {
        return res.status(500).json({ status: false, error: error });
      } else {
        console.log(result);
        return res.status(200).json({ status: true, data: result });
      }
    }
  );
});







/////imaggge slidserrr////
router.post("/display_vendor_properties", function (req, res, next) {
  console.log("myitempic", req.body);

  var q =
    "select P.* from vendorproperty P where P.address like '%"+req.body.cityname+"%'||'%"+req.body.mobileno+"%'";

  pool.query(q, function (error, result) {
   
    if (error) {
      return res.status(500).json({ status: false, error: error });
    } else {

      
      console.log("myitempic", result);

      return res.status(200).json({ data:result});
    }
  });
});





/*EDIT CITY*/
router.post("/updatecity", function (req, res, next) {
  pool.query(
    "update cities set stateid=?, cityname=? where cityid=?",
    [req.body.stateid, req.body.cityname, req.body.cityid],
    function (error, result) {
      if (error) {
        return res.status(500).json({ status: false, error: error });
      } else {
        return res.status(200).json({ status: true });
      }
    }
  );
});

/*Delete CITY*/

router.post("/deletecity", function (req, res, next) {
  console.log("inn");
  pool.query(
    "delete from  cities  where cityid=?",
    [req.body.cityid],
    function (error, result) {
      if (error) {
        return res.status(500).json({ status: false, error: error });
      } else {
        return res.status(200).json({ status: true });
      }
    }
  );
});

/*Edit picture CITY*/

router.post(
  "/updatecitypicture",
  upload.single("picture"),
  function (req, res, next) {
    console.log(req.body);
    pool.query(
      "update  cities  set picture=? where cityid=?",
      [req.ufilename, req.body.cityid],
      function (error, result) {
        if (error) {
          return res.status(500).json({ status: false, error: error });
        } else {
          try {
            fs.unlinkSync(
              "E:/REACTJS project/Hotelmgmt(Reactjs-MYSQL)/reactmediater/public/images/" +
                req.body.oldpicture
            );
          } catch (error) {}
          return res.status(200).json({ status: true });
        }
      }
    );
  }
);

/* GET STATES page. */
router.post("/addnewstates", function (req, res, next) {
  pool.query("insert into states set ?", [req.body], function (error, result) {
    if (error) {
      return res.status(500).json({ status: false, error: error });
    } else {
      return res.status(200).json({ status: true });
    }
  });
});

/////displaystate image////////////

router.get("/displaystates", function (req, res, next) {
  pool.query("select * from states ", function (error, result) {
    if (error) {
      return res.status(500).json({ status: false, error: error });
    } else {
      console.log(result);
      return res.status(200).json({ status: true, data: result });
      console.log("mydatadeeeee", result);
    }
  });
});

router.post("/updatestate", function (req, res, next) {
  pool.query(
    "update states set statename=? where stateid=?",
    [req.body.statename, req.body.stateid],
    function (error, result) {
      if (error) {
        return res.status(500).json({ status: false, error: error });
      } else {
        return res.status(200).json({ status: true });
      }
    }
  );
});

router.post("/deletestate", function (req, res, next) {
  console.log("inn");
  pool.query(
    "delete from  states  where stateid=?",
    [req.body.stateid],
    function (error, result) {
      if (error) {
        return res.status(500).json({ status: false, error: error });
      } else {
        return res.status(200).json({ status: true });
      }
    }
  );
});

//vendor record
/* insert city image. */
router.post("/addvendor", function (req, res, next) {
  pool.query(
    "insert IGNORE into vendors set ?",
    [req.body],
    function (error, result) {
      if (error) {
        console.log(req.body);
        return res.status(500).json({ status: false, error: error });
      } else {
        pool.query(
          "insert IGNORE into vendorproperty(emailid,mobileno,propertyid,subpropertyid,title,price,offerprice,address,propertystatus,amenities,pictures,placedescription,placeoffer)values(?,?,?,?,?,?,?,?,?,?,?,?,?)",

          [
            req.body.emailid,
            req.body.mobileno,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
          ],
          function (error, result) {}
        );

        return res.status(200).json({ status: true,data:result });
      }
    }
  );
});

/*GET All vendor*/
router.get("/displayvendor", function (req, res, next) {
  pool.query("select * from vendors", function (error, result) {
    if (error) {
      return res.status(500).json({ status: false, error: error });
    } else {
      return res.status(200).json({ status: true, data: result });
    }
  });
});

//DELETE ALL VENDOR
router.post("/deletevendor", function (req, res, next) {
  console.log("inn");
  pool.query(
    "delete from  vendors  where emailid=?",
    [req.body.emailid],
    function (error, result) {
      if (error) {
        return res.status(500).json({ status: false, error: error });
      } else {
        return res.status(200).json({ status: true });
      }
    }
  );
});

///list vendor property//////
router.post("/display_vendorproperty_bystatename", function (req, res, next) {
  console.log("inn");
  pool.query(
    "select from  vendorproperty  where statename=?",
    [req.body.emailid],
    function (error, result) {
      if (error) {
        return res.status(500).json({ status: false, error: error });
      } else {
        return res.status(200).json({ status: true });
      }
    }
  );
});

//search vendor mobile no.
router.post("/search_vendor_mobileno", function (req, res, next) {
  console.log(req.body);
  pool.query(
    "select * from vendors where mobileno=?",
    [req.body.mobileno],
    function (error, result) {
      console.log(result);
      if (error) {
        return res.status(500).json({ status: false, error: error });
      } else {
        if (result.length == 0) {
          return res.status(200).json({ status: false });
        } else {
          return res.status(200).json({ status: true, result: result[0] });
        }
      }
    }
  );
});

//search vendor property be emailid/mobileno
router.post("/search_vendor_property", function (req, res, next) {
  console.log(req.body);
  pool.query(
    "select * from vendorproperty where mobileno=?",
    [req.body.mobileno],
    function (error, result) {
      if (error) {
        return res.status(500).json({ status: false, error: error });
      } else {
        console.log("result", result);
        return res.status(200).json({ status: true, data: result[0] });
      }
    }
  );
});





router.post("/update_vendor_properties", function (req, res) {
  var option = req.body.opr;
  console.log(req.body.opr);
  switch (option) {
    case "ADD_VENDOR_PROPERTIES":
      pool.query(
        "update vendorproperty set propertyid=? where mobileno=?",
        [req.body.propertyid, req.body.mobileno],
        function (error, result) {
          console.log(result);
          if (error) {
            console.log(error);
            return res.status(500).json({ status: false, error: error });
          } else {
            // console.log("datamynone", req.body);
            return res.status(200).json({ status: true });
          }
        }
      );
      break;

    case "ADD_VENDOR_SUBPROPERTIES":
      pool.query(
        "update vendorproperty set subpropertyid=? where mobileno=?",
        [req.body.subpropertyid, req.body.mobileno],
        function (error, result) {
          console.log(result);
          if (error) {
            return res.status(500).json({ status: false, error: error });
          } else {
            console.log("datamynone", req.body);
            return res.status(200).json({ status: true });
          }
        }
      );

      break;

    case "ADD_VENDOR_PROPERTY_STATUS":
      pool.query(
        "update vendorproperty set propertystatus=? where mobileno=?",
        [req.body.propertystatus, req.body.mobileno],
        function (error, result) {
          if (error) {
            return res.status(500).json({ status: false });
          } else {
            return res.status(200).json({ status: true });
          }
        }
      );
      break;

    case "ADD_VENDOR_ADDRESS":
      pool.query(
        "update vendorproperty set address=? where mobileno=?",
        [req.body.address, req.body.mobileno],
        function (error, result) {
          if (error) {
            console.log(error);
            return res.status(500).json({ status: false });
          } else {
            return res.status(200).json({ status: true });
          }
        }
      );

      break;
    case "ADD_VENDOR_PLACEOFFER":
      pool.query(
        "update vendorproperty set placeoffer=? where mobileno=?",
        [req.body.placeoffer, req.body.mobileno],
        function (error, result) {
          if (error) {
            console.log(error);
            return res.status(500).json({ status: false });
          } else {
            return res.status(200).json({ status: true });
          }
        }
      );
      break;
    case "ADD_VENDOR_AMENITIES":
      console.log("myamenities", req.body);
      pool.query(
        "update vendorproperty set amenities=? where mobileno=?",
        [req.body.amenities, req.body.mobileno],
        function (error, result) {
          if (error) {
            console.log(error);
            return res.status(500).json({ status: false });
          } else {
            console.log("myaresult", req.body);
            return res.status(200).json({ status: true,data:result });
          }
        }
      );
      break;
    case "ADD_VENDOR_PICTURES":
      console.log("myamenities", req.body);
      pool.query(
        "update vendorproperty set pictures=? where mobileno=?",
        [req.body.amenities, req.body.mobileno],
        function (error, result) {
          if (error) {
            console.log(error);
            return res.status(500).json({ status: false });
          } else {
            return res.status(200).json({ status: true });
          }
        }
      );
      break;
    case "ADD_VENDOR_DETAILS":
      console.log("myamenities", req.body);
     
      var q= "update vendorproperty set placedescription='"+req.body.placedescription+"',title='"+req.body.title+"',price='"+req.body.price+"',offerprice='"+req.body.offerprice+"',status='"+req.body.status+"',review='"+req.body.review+"',rating='"+req.body.rating+"' where mobileno="+req.body.mobileno+" ";
      pool.query(
       q,
        
        function (error, result) {
          console.log("myquery", q);
          if (error) {
            console.log(error);
            return res.status(500).json({ status: false });
          } else {
            console.log("myfinaldata", req.body);
            return res.status(200).json({ status: true ,data:result});
          }
        }
      );
      break;
  }
});

//upload picture
router.post(
  "/update_vendor_properties_pictures",
  upload.any(),
  function (req, res, next) {
    console.log(req.body)
    var oldpicture = JSON.parse(req.body.oldpicture);
    console.log(oldpicture)
    var temp = {};
    var i = 0;
    req.files.map((item, index) => {
      temp[i] = item.filename;
      i++;
    });
    if (Object.keys(oldpicture).length > 0) {
      Object.values(oldpicture).map((item, index) => {
        temp[i] = item;
        i++;
      });
    }
    console.log(temp);
    pool.query(
      "update vendorproperty set pictures=? where mobileno=?",
      [JSON.stringify(temp), req.body.mobileno],
      function (error, result) {
        if (error) {
          console.log(error)
          return res.status(500).json({ status: false, error: error });
        } else {
          return res.status(200).json({ status: true });
        }
      }
    );
  }
);

module.exports = router;
