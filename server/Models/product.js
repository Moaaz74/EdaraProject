const db = require ("../db/connection");
const util = require("util"); // helper
const query = util.promisify(db.query).bind(db); // transform query mysql --> promise to use [await/async]
class Product {

    name = '';
    descritption = '';
    photo ='';
    stock = '';
    warehouseId = '';

    constructor(req , x) {
        if(req == null) return true
        else if(x==1) {
            this.name = req.body.name;
            this.description = req.body.description;
            this.photo = req.file.filename;
            this.stock = req.body.stock;
            this.warehouseId = req.body.warehouseId;
        }
        else {
            this.name = req.body.name;
            this.description = req.body.description;
            this.stock = req.body.stock;
            this.warehouseId = req.body.warehouseId;
        }
        
    }

    saveProduct (product) {
        return new Promise((resolve,reject) => {   
            db.query("insert into product set ?", product , (error , result) => {
                if (error) {
                    resolve(reject);
                }
                else {
                    resolve(result);
                }
            } )
        }
        )
}

    saveUpdatedProduct(id) {
        return new Promise((resolve,reject) => {   
            db.query("update product set product.name = ? , product.descritption = ? , product.stock = ? where id = ? ", [this.name , this.description , this.stock , id] , (error , result) => {
                if (error) {
                    resolve(reject);
                }
                else {
                    resolve(result);
                }
            } )
        }
        )
    }

    static deleteProduct(id) {
        return new Promise((resolve,reject) => {   
            db.query("delete from product where id = ?", id , (error , result) => {
                if (error) {
                    resolve(reject);
                }
                else {
                    resolve(result);
                }
            } )
        }
        )
    }

    static async check_warehouse_id(id , res){
        const query = util.promisify(db.query).bind(db);
        const product = await query("select * from product where id = ?" ,[id]);
        if(product[0]) {
            return true;
        }
        return false;
    }



    static async showProducts(id , res) {
        const query = util.promisify(db.query).bind(db);
        const product = await query("select * from product where id = ?" ,[id]);
        res.status(200).json(product); 
    }
        
    static async check_product_name(name , res) {
        const query = util.promisify(db.query).bind(db);
        const product = await query("select * from product where name = ?" ,[name]);
        if(product[0]) {
            res.status(400).json({ ms: "Prodct name is already existed" });
            return true;
        }
        return false;
    }

    async getJsonProduct(id){
        return await query("select * from product where id = ?" ,[id])
        
    } 

    static async check_product_exist(name , id , res) {
        const query = util.promisify(db.query).bind(db);
        const product = await query("select * from product where name = ? AND NOT id = ?" ,[name , id]);
        if(product[0]) {
            res.status(400).json({ ms: "Prodct name is already existed" });
            return true;
        }
        return false;
    }
        


    static async check_product_id(id , res) {
        const query = util.promisify(db.query).bind(db);
        const product = await query("select * from product where id = ?" ,[id]);
        if(!product[0]) {
            res.status(400).json({ ms: "product id is not found" });
            return true;
        }
        return false;
    }

    async updateStock(stock,id){
        await query("UPDATE product SET stock = ? WHERE id = ? " ,[stock,id]);
    }

}
module.exports = Product;