const conn = require('../db/connection');
const util  = require('util');
const query = util.promisify(conn.query).bind(conn); // transform query mysql --> promise to use [await/async]
class Request{
    productId = '' ;
    warehouseId = '';
    quantity ='';
    supervisorId='' ;
    approval ='';

  async insertRequest(id){
    const query = util.promisify(conn.query).bind(conn);
    const product = await query( "select * from product where id = ?",[id]);

    if(product.length==0)
      return "ERROR product not found";
    const warehouseId = product[0].warehouseId;

    const supervisor = await query( "select * from warehouse where id = ?",[warehouseId]);
    if(supervisor.length ==0)
      return "ERROR warehouse does not has supervisor";
    const supervisorId = supervisor[0].supervisorId;

   await query(" insert into request (productId,warehouseId,quantity,supervisorId) values(?,?,?,?)",[id,warehouseId,this.quantity,supervisorId]);
        
   return "Request is added";  

    }

  async showSupervisorReq(id){
      const query = util.promisify(conn.query).bind(conn);
      const user = await query( "select * from user where id = ?",[id]);
      if(user.length==0)
      return "ERROR supervisor not found";
      const result =  await query( "select product.name,request.quantity,request.approval from product join request on product.id = request.productId and request.supervisorId = ?",[id]);

      return result;
  }  

  async getPendingRequests(){
    const requestsRaw = await query("SELECT request.* , user.name , user.email , product.name as ProductName , warehouse.name as warehouseName from request JOIN user ON request.supervisorId = user.id JOIN product ON product.id = request.productId JOIN warehouse ON request.warehouseId = warehouse.id where approval = 'Pending'");
    const requests = JSON.stringify(requestsRaw);
    const data = JSON.parse(requests);
    return data;
  }

  async getRequests(){
    const requestsRaw = await query("SELECT request.* , user.name , user.email , product.name as ProductName , warehouse.name as warehouseName from request JOIN user ON request.supervisorId = user.id JOIN product ON product.id = request.productId JOIN warehouse ON request.warehouseId = warehouse.id WHERE approval != 'Pending'");
    const requests = JSON.stringify(requestsRaw);
    const data = JSON.parse(requests); 
    return data;
  }

  async getRequestById(id){
        return await query("select * from request where id = ?" ,[id])
  }

  async upadateRequest(id , approval){
    await query("UPDATE request SET approval = ? WHERE id = ?" , [approval , id])
  }

}

module.exports = Request;