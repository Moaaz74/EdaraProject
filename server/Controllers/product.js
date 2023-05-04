const Product = require("../Models/product");
const { body, validationResult } = require('express-validator');
const Warehouse = require("../Models/warehouse");
const warehouse = new Warehouse();
class productController {


    static async addProduct(req, res) {    
      //console.log(req.body);
      if(productController.checkInputValidation(req , res) == true)  return;
      if(productController.checkImage(req , res) == true)  return;
      if(await Product.check_product_name(req.body.name , res) == true) return;
      if(await Product.check_warehouse_id(req.params.id , res) == true) return ;
      const product = new Product(req , 1);
      const productObject = { 
        name : req.body.name,
        descritption : req.body.description,
        photo : req.file.filename,
        stock : req.body.stock, 
        warehouseId : req.params.id 
    }
    console.log(productObject);
      const result = await product.saveProduct(productObject);      
      productController.operationCheck(result,res);
  }

  static async updateProduct (req , res) {
    if(await Product.check_product_id(req.params.id , res) == true) return ;
    if(productController.checkInputValidation(req , res) == true)  return;
    if(await Product.check_product_exist(req.body.name , req.params.id , res) == true) return;
    const product = new Product(req , 2);
    const result = await product.saveUpdatedProduct(req.params.id);
    this.operationCheck(result,res);
  }

  static async deleteProduct (req , res) {
    if(await Product.check_product_id(req.params.id , res) == true) return ;
    const result = await Product.deleteProduct(req.params.id);
    this.operationCheck(result,res);
  }

  static async show_Products_Per_Warehouse(req , res) {
    if(await Product.check_warehouse_id(req.params.id , res) == true) return ;
    const products = await warehouse.getProducts(req , req.params.id);
    res.status(200).json(products); 
  }

  static async show_Product(req , res) {
    if(await Product.check_product_id(req.params.id , res) == true) return ;
    await Product.showProducts(req.params.id , res);
  }

  static operationCheck(result,res) {
    if (result == 'error') {
      res.status(201).json({ msg: result });
    } else {
      res.status(200).json({ msg: 'done' });
    }
  }

  static checkInputValidation(req , res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return true;
    }
    
  };

  static checkImage(req , res) {
    if (!req.file) {
      res.status(400).json({
        errors: [ { msg: "Image is Required", },
        ],
      });
      return true;
    }
  };

}

module.exports = productController;
