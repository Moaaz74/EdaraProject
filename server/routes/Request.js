const {Router} = require('express');
const express = require('express');
const router = express.Router();
const requestc = require('../Controllers/request');
const admin = require('../middleware/admin');
const auth = require("../middleware/auth") ;
const multer = require('multer');
const upload = multer();

router.post('/create/:id',upload.none(),requestc.insertRequest);

router.get('/show/:id',upload.none(),auth,requestc.showSupervisorReq);

router.get('/showall' ,upload.none(), admin , requestc.showRequests);

router.get('/showPendingRequests' ,upload.none(), admin , requestc.ShowPendingRequests);

router.put('/update/:id' , upload.none() , admin , requestc.updateRequest);

module.exports = router ;