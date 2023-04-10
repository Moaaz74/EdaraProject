const {Router} = require('express');
const express = require('express');
const router = express.Router();
const requestc = require('../Controllers/request');


router.post('/createrequest:id',requestc.insertRequest);

router.get('/showrequest:id',requestc.showSupervisorReq);

module.exports = router ;