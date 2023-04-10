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
  ];

  function check_if_product_exist(req , res) {
    const product = new Product(null);
    const result = product.check_product_name(req.body.name , res);
    if(result == true){
      
      return true;
    } 
    else return false;
    
  }

  router.post("/addProduct" , admin, upload.single("photo"), validateUserData , (req , res) => {
      if(check_if_product_exist(req , res) == true) return;
      productController.addProduct(req,res);
    }
)

  router.put("/updateProduct/:id" ,admin, validateUserData , (req , res) => {
    if(check_if_product_exist(req , res) == true) return;
      productController.updateProduct(req,res);
  }

)

router.delete( "/deleteProduct/:id" , admin, (req , res) => {
  productController.deleteProduct(req , res);
  }
)

router.get( "/showProducts/:id" , authurized , (req , res) => {
  productController.show_Products_Per_Warehouse(req , res);
  }
)

router.get( "/showProduct/:id" , authurized , (req , res) => {
  productController.show_Product(req , res);
  }
)
module.exports = router;