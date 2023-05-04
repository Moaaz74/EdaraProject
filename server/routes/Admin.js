const {Router} = require('express');
const express = require('express');
const router = express.Router();
const {body,resvalidate} =require('express-validator');
const multer = require('multer');
const upload = multer();
const adminc = require('../Controllers/admin');

const validateUserData = [
    body("email").isEmail().withMessage("please enter valid email "),
    body('name').isString().withMessage("please enter valid name ").isLength({ min: 3, max: 20 }).withMessage("name should be in range 3-20"),
    body('phone').isLength({ min: 11, max: 11 }).withMessage('Phone number must be 11 digits long and only number'),
    body('phone').isMobilePhone().withMessage("It is not a phone number")


];

router.put('/updatesupervisor/:id',upload.none(),validateUserData,adminc.updateSupervisor);

router.delete('/deletesupervisor/:id',adminc.deleteSupervisor);

router.put('/updaterequest/:id',adminc.updateRequest);

router.delete('/deleterequest/:id',adminc.deleteRequest);

router.get('/showpendingrequests',adminc.showPendingRequests);  

router.get('/showallrequests',adminc.showAllRequests);

module.exports = router; 