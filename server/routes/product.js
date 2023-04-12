const router = require('express').Router();
const conn = require('../db/connection');
const admin = require('../middleware/admin');
const authurized = require("../middleware/auth");
const { body, validationResult } = require('express-validator');
const upload = require("../middleware/uploadImages");
const fs = require("fs");
const productController = require("../Controllers/product");
const Product = require('../Models/product');


  const validateUserData = [
    body("name").isString().withMessage("please enter valid name ").isLength({ min: 3, max: 20 }).withMessage("description should be at lease 30 characters"),
    body('descritption').isString().withMessage("please enter valid description ").isLength({ min: 8, max: 30 }).withMessage("description should be at lease 30 characters") , 
    body('stock').notEmpty().withMessage("please enter stock quantity").isInt({ min : 0}).withMessage("please enter Integer number"),
    body('warehouseId').notEmpty().withMessage("please enter warehouse id").isInt({ min : 1}).withMessage("please enter Integer number"),
  ];

  router.post("/add" , admin, upload.single("photo"), validateUserData , (req , res) => {
      productController.addProduct(req,res);
    }
)

  router.put("/update:id" ,admin, validateUserData , (req , res) => {
      productController.updateProduct(req,res);
  }

)

router.delete( "/delete:id" , admin, (req , res) => {
  productController.deleteProduct(req , res);
  }
)

router.get( "/showall:id" , authurized , (req , res) => {
  productController.show_Products_Per_Warehouse(req , res);
  }
)

router.get( "/show:id" , authurized , (req , res) => {
  productController.show_Product(req , res);
  }
)
module.exports = router;