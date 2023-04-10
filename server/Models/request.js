const conn = require('../db/connection');
const util  = require('util');
class Request{
    productId = '' ;
    warehouseId = '';
    quantity ='';
    supervisorId='' ;
    approval ='';

  async insertRequest(id){
    const query = util.promisify(conn.query).bind(conn);
    const warehouse = await query( "select * from product where id = ?",[id]);

    if(warehouse.length==0)
    return "ERROR product not found";
    const warehouseId = warehouse[0].warehouseId;

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

}

module.exports = Request;