const express = require('express');
const router = express.Router();
const supervisorcontroller = require("../Controllers/supervisor");
const { body, validationResult } = require('express-validator');
const authentication = require("../middleware/auth") ;
const isadmin= require("../middleware/admin") ;


router.get('/',isadmin,supervisorcontroller.getallsupervisor);


// Validation middleware
const validateUserData = [
    body("email").isEmail().withMessage("please enter valid email "),
    body('passward').isLength({ min: 8, max: 20 }).withMessage("please enter valid password ") , 
    body('name').isString().withMessage("please enter valid name ").isLength({ min: 6, max: 20 }).withMessage("name should be in range 6-20"),
    body('phone').matches(/^\d{11}$/).withMessage('Phone number must be 10 digits long')


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