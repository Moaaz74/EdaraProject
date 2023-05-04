const conn = require('../db/connection');
const util  = require('util');
const query = util.promisify(conn.query).bind(conn); // transform query mysql --> promise to use [await/async]
const supervisor = require('../Models/supervisor');

class Warehouse{

    constructor(){}

    async createWarehouse(warehouse){
        await query("INSERT into warehouse SET ? ",warehouse);
        return true;
    }

    async deleteWarehouse(id){
        await query("DELETE from warehouse WHERE warehouse.id = ?" , [id]);
    }

    async upadateWarehouse(id , warehouse){
        await query("UPDATE warehouse SET ? WHERE id = ?" , [warehouse , id])
    }
    

    async getSpecificWarehouse(id){

        const warehouses =  await this.getWarehouses();
        for (let i = 0; i < warehouses.length; i++) {
            const jsonWarehouse = warehouses[i];
            for(let key in jsonWarehouse){
                if(jsonWarehouse[key] == id)return jsonWarehouse;
            }
        }
        return "Error";
    }

    async getProducts(req , id){
        const productRaw = await query("select * from product where warehouseId = ?" ,[id])
        productRaw.map((prod) => {
            prod.photo = "http://" + req.hostname + ":3000/" + prod.photo;
        });
        const products = JSON.stringify(productRaw);
        const data = JSON.parse(products);
        return data;
    }

    async getWarehouses(){

        // USED LEFT JOIN TO GET ALL WAREHOUSES THAT CONTAIN PRODUCTS OR NOT
        const warehousesRaw = await query("SELECT warehouse.id , warehouse.name ,warehouse.location,warehouse.state,user.id as supervisorId,user.email,SUM(product.stock) as totalStockQuantity FROM warehouse JOIN user on warehouse.supervisorId = user.id LEFT JOIN product on product.warehouseId = warehouse.id  GROUP BY warehouse.id,warehouse.name");
        const warehouses = JSON.stringify(warehousesRaw);
        const data = JSON.parse(warehouses);
        return data;
    }

    async getWarehouseByName(name){

        const warehouseRaw = await query("SELECT * FROM `warehouse` WHERE warehouse.name = ?",[name]);
        return warehouseRaw;
    }

    async getWarehouseById(id){
        const warehouseRaw = await query("SELECT * FROM `warehouse` WHERE warehouse.id = ?",id);
        return warehouseRaw;
    }

    async getWarehouseBySupervisorEmail(email){
        const supervisorRaw = await supervisor.getsupervisorByEmail(email);
        const warehouseRaw = await query("SELECT warehouse.supervisorId FROM `warehouse` WHERE warehouse.supervisorId = ?" , [supervisorRaw[0].id]);
        return warehouseRaw;
    } 

}  


module.exports = Warehouse;