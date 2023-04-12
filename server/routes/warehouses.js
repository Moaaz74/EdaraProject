const router = require('express').Router();
const admin = require('../middleware/admin');
const warehouseExport = require("../Controllers/warehouse");
const { body } = require('express-validator');


// GET ALL WAREHOUSES
router.get("/showall" ,admin, warehouseExport.getWarehouses); 


// GET SPECIFICE WAREHOUSE
router.get("/show:id" , admin , warehouseExport.getSpecificWarehouse);


// CREATE WAREHOUE
router.post("/create" , admin,
body("name")
.isString()
.withMessage("Please Enter valid warehouse name")
.isLength({min : 4 , max : 255})
.withMessage("Warehouse name should not be less than 4 characters and no more than 255 character")
,body("location")
.isString()
.withMessage("Please Enter a valid Location")
.isLength({min : 4 , max : 255})
.withMessage("Warehouse Location should not be less than 4 characters and no more than 255 character") , warehouseExport.createWarehouse);


// UPDATE WAREHOUSE
router.put('/update:id' ,admin,body("name")
.isString()
.withMessage("Please Enter valid warehouse name")
.isLength({min : 4 , max : 255})
.withMessage("Warehouse name should not be less than 4 characters and no more than 255 character")
,body("location")
.isString()
.withMessage("Please Enter a valid Location")
.isLength({min : 4, max : 255})
.withMessage("Warehouse Location should not be less than 4 characters and no more than 255 character") ,
warehouseExport.updateWarehouse);


// DELETE WAREHOUSE
router.delete('/delete:id' , admin , warehouseExport.deleteWarehouse);


module.exports = router;