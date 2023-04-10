const Product = require("../Models/product");
const { body, validationResult } = require('express-validator');
const Warehouse = require("../Models/warehouse");
class productController {


  static async addProduct(req, res) {
    const product = new Product(req , 1);
    if(this.checkInputValidation(req , res) == true)  return;
    if(this.checkImage(req , res) == true)  return;
    // if(!this.checkWarehouseid(req , res) == true) {
    //   res.status(404).json({msg: "warehouse is not found !"});
    // }
    const result = await product.saveProduct();
    this.operationCheck(result,res);
  }

  static async updateProduct (req , res) {
    const product = new Product(req , 2);
    if(this.checkInputValidation(req , res) == true)  return;
    const result = await product.saveUpdatedProduct(req.params.id);
    this.operationCheck(result,res);
  }

  static async deleteProduct (req , res) {
    const product = new Product(null);
    const result = await product.deleteProduct(req.params.id);
    this.operationCheck(result,res);
  }

  static async show_Products_Per_Warehouse(req , res) {
    const product = new Product(null);
    await product.listProducts(req.params.id , res);
    
    
  }

  static async show_Product(req , res) {
    const product = new Product(null);
    await product.showProducts(req.params.id , res);
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

  // static async checkWarehouseid (req , res) {
  //   const warehouse = new Warehouse('Warehouse');
  //   const result = await warehouse.getWarehouseById(req.body.warehouseId);
  //   if(result.length > 0) {
  //     return true;
  //   }
  //   return false;
  // }
}

module.exports = productController;
