const router = require('express').Router();
const admin = require('../middleware/admin');
const warehouseExport = require("../Controllers/warehouse");
const { body } = require('express-validator');


// GET ALL WAREHOUSES
router.get("" ,admin, warehouseExport.getWarehouses); 


// GET SPECIFICE WAREHOUSE
router.get("/:id" , admin , warehouseExport.getSpecificWarehouse);


// CREATE WAREHOUE
router.post("/create-warehouse" , admin,
body("name")
.isString()
.withMessage("Please Enter valid warehouse name")
.isLength({min : 10 , max : 255})
.withMessage("Warehouse name should not be less than 10 characters and no more than 255 character")
,body("location")
.isString()
.withMessage("Please Enter a valid Location")
.isLength({min : 5 , max : 255})
.withMessage("Warehouse Location should not be less than 5 characters and no more than 255 character") , warehouseExport.createWarehouse);


// UPDATE WAREHOUSE
router.put('/update-warehouse/:id' ,admin,body("name")
.isString()
.withMessage("Please Enter valid warehouse name")
.isLength({min : 10 , max : 255})
.withMessage("Warehouse name should not be less than 10 characters and no more than 255 character")
,body("location")
.isString()
.withMessage("Please Enter a valid Location")
.isLength({min : 5 , max : 255})
.withMessage("Warehouse Location should not be less than 5 characters and no more than 255 character") ,
warehouseExport.updateWarehouse);


// DELETE WAREHOUSE
router.delete('/delete-warehouse/:id' , admin , warehouseExport.deleteWarehouse);


module.exports = router;