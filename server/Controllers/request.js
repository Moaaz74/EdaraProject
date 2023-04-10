const e = require('cors');
const conn = require('../DB/connection');
const Request = require('../Models/request');

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


}
const requestc = new RequestController();
module.exports = requestc;