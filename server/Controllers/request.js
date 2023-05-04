const e = require('cors');
const conn = require('../db/connection');
const Request = require('../Models/request');
const Product = require('../Models/product');
const product = new Product();
const request = new Request();

class RequestController{

   async insertRequest(req,res){
          request.productId= req.params.id;
          request.quantity = req.body.quantity;
          const result =  await request.insertRequest(req.params.id);
   
          if(result != "Request is added")
                    res.status(404).json({ msg : result});
          else
                    res.json({ msg : result});
          }

    async showSupervisorReq(req,res){  
      var result = await request.showSupervisorReq(req.params.id);
      if(result=="ERROR supervisor not found")
          res.status(404).json({
               msg : result});
     else if(result.length == 0)
          res.status(404).json({
          msg : "Supervisor does not have request"});
     else
          res.send(result);
}

     async showRequests(req , res){
          const result = await request.getRequests();
          res.status(200).send(result);
     }

     async ShowPendingRequests(req ,res){
          const result = await request.getPendingRequests();
          res.status(200).send(result);
     }

     async updateRequest(req , res ){
          if(req.query.answer == "Agree"){
               const requestJson = await request.getRequestById(req.params.id);
               const productJson = await product.getJsonProduct(requestJson[0].productId);
               productJson[0].stock += requestJson[0].quantity;
               product.updateStock(productJson[0].stock,productJson[0].id);
          }
          await request.upadateRequest(req.params.id , req.query.answer);
          res.status(200).json({msg : "Request updated successfully"});
     }

}
const requestc = new RequestController();
module.exports = requestc;