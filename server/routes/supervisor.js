const express = require('express');
const router = express.Router();
const supervisorcontroller = require("../Controllers/supervisor");
const { body, validationResult } = require('express-validator');
const authentication = require("../middleware/auth") ;
const isadmin= require("../middleware/admin") ;


router.get('/showall',isadmin,supervisorcontroller.getallsupervisor);


// Validation middleware
const validateUserData = [
    body("email").isEmail().withMessage("please enter valid email "),
    body('password').isLength({ min: 8, max: 16 }).withMessage("please enter valid password ") , 
    body('name').isString().withMessage("please enter valid name ").isLength({ min: 3, max: 20 }).withMessage("name should be in range 3-20"),
    body('phone').isLength({ min: 11, max: 11 }).withMessage('Phone number must be 11 digits long and only number'),
    body('phone').isMobilePhone().withMessage("It is not a phone number")


  ];
  
  router.post('/create', isadmin ,validateUserData, (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      // If the request data passes validation, call your controller function here
      supervisorcontroller.createsupervisor(req, res);
  
    }
    catch (error) {
      console.log(error)
    }
  
  
  }
  
  ) ;  
  router.get('/getsupervisor/:id',isadmin,supervisorcontroller.getsupervisor);



module.exports = router;