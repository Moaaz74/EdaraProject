const {Router} = require('express');
const express = require('express');
const router = express.Router();
const {body,resvalidate} =require('express-validator');
const adminc = require('../Controllers/admin');


router.put('/updatesupervisor:id',adminc.updateSupervisor);

router.delete('/deletesupervisor:id',adminc.deleteSupervisor);

router.put('/updaterequest:id',adminc.updateRequest);

router.delete('/deleterequest:id',adminc.deleteRequest);

router.get('/showpendingrequests',adminc.showPendingRequests);

router.get('/showallrequests',adminc.showAllRequests);

module.exports = router;