const conn = require('../db/connection');
const user = require ("../Models/user");
const {body,resvalidate} =require('express-validator');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const Request = require('../Models/request');
const { resolve } = require('path');
const util  = require('util');
const { error, log } = require('console');
const request = new Request();

class Admin extends user {
id = 8;
    constructor(type) {
        super(type);
      }
      
  async updateSupervisor(id){
    const query = util.promisify(conn.query).bind(conn);
    const checkIdExists = await query("select * from user where id= ?",[id]);
    if(checkIdExists.length==0)
    return "ERROR supervisor does not exist";

    const checkEmailExists = await query("select * from user where email= ?",[this.email]);
    if(checkEmailExists.length > 0 && checkEmailExists[0].type == "admin")return "Email is not allowed";
    if(checkEmailExists.length>0 && checkEmailExists[0].id != id)
        return "Email is already exists";
    
    await query( "update user set name = ? , email =? , state = ? , phone = ?  where id = ?",[this.name,this.email,this.state,this.phone,id]);
        
        return "Supervisor is updated";      
        
  }

    async deleteSupervisor(id){
        const query = util.promisify(conn.query).bind(conn);
    const checkIdExists = await query("select * from user where id= ?",[id]);
    if(checkIdExists.length==0)
    return "ERROR supervisor does not exist";   
    else if(id==this.id)
    return "ERROR can not delete admin!!!";   
    await query("delete from user where id = ? and type = 'supervisor'",[id]);
          return "Supervior is deleted";
}

async showPendingRequests(){
return new Promise((resolve,reject)=>{
var fist_join= "select product.name as productName, warehouse.name as warehouseName, user.name as userName,user.email,request.approval , request.quantity from request join product on request.productId=product.id and request.approval='Pending'";
var sec_join=" join warehouse on product.warehouseId = warehouse.id";
var thrid_join = " join user on warehouse.supervisorId = user.id";
var sql = fist_join+sec_join+thrid_join;
conn.query(sql,(err,result)=>{
    if(result)
   resolve(result);
   
    else 
    resolve("ERROR");
});
});
}

async showAllRequests(){
    return new Promise((resolve,reject)=>{
    var fist_join= "select product.name as productName, warehouse.name as warehouseName, user.name as userName,user.email,request.approval , request.quantity from request join product on request.productId=product.id";
    var sec_join=" join warehouse on product.warehouseId = warehouse.id";
    var thrid_join = " join user on warehouse.supervisorId = user.id";
    var sql = fist_join+sec_join+thrid_join;
    conn.query(sql,(err,result)=>{
        if(result)
       resolve(result);
       
        else 
        resolve("ERROR");
    });
    });
    }


async updateRequest(id){
    const query = util.promisify(conn.query).bind(conn);
    const checkIdExists = await query("select * from request where id= ?",[id]);
    if(checkIdExists.length==0)
    return "ERROR request does not exist";
    
await query("update request set approval = ? where id = ?",[request.approval,id]);

if(request.approval=='Accepted'){
const Request =await query("select * from request where id =?",[id]);
if(Request.length >0 ){
    var productid = Request[0].productId;
    var quantity = Request[0].quantity;
    const product = await query("select * from product  where id = ?",[productid]);
    var stock = product[0].stock;
    if(stock+quantity>=0)
    await query("update product set stock = stock + ? where id = ?",[quantity,productid]);
    else
    await query("update product set stock = 0 where id = ?",[productid]);
    
    return "Request and product stock are updated";
}
else
return "Request is not found";
}
return "Request is updated";
}

async deleteRequest(id){
    const query = util.promisify(conn.query).bind(conn);
    const checkIdExists = await query("select * from request where id= ?",[id]);
    if(checkIdExists.length==0)
    return "ERROR request does not exist";

    await query("delete from request where id = ?",[id]);
       
       return "Request is deleted";  
}

}

module.exports = {Admin,request};
