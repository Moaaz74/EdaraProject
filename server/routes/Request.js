const {Router} = require('express');
const express = require('express');
const router = express.Router();
const requestc = require('../Controllers/request');


router.post('/create:id',requestc.insertRequest);

router.get('/show:id',requestc.showSupervisorReq);

module.exports = router ;