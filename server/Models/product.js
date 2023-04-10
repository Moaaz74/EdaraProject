const db = require ("../db/connection");
const util = require("util"); // helper
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
            this.descritption = req.body.descritption;
            this.photo = req.file.filename;
            this.stock = req.body.stock;
            this.warehouseId = req.body.warehouseId;
        }
        else {
            this.name = req.body.name;
            this.descritption = req.body.descritption;
            this.stock = req.body.stock;
            this.warehouseId = req.body.warehouseId;
        }
        
    }

    saveProduct () {
        return new Promise((resolve,reject) => {   
            db.query("insert into product set ?", this , (error , result) => {
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
            db.query("update product set ? where id = ?", [this,id] , (error , result) => {
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

    deleteProduct(id) {
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

    async listProducts(id , res) {
        const query = util.promisify(db.query).bind(db);
        const product = await query("select * from product where warehouseId = ?" ,[id]);
        res.status(200).json(product); 
    }

    async showProducts(id , res) {
        const query = util.promisify(db.query).bind(db);
        const product = await query("select * from product where id = ?" ,[id]);
        res.status(200).json(product); 
    }
        
    async check_product_name(name , res) {
        const query = util.promisify(db.query).bind(db);
        const product = await query("select * from product where name = ?" ,[name]);
        if(product[0]) {
            res.status(400).json({ ms: "Prodct name is already esisted" });
            return true;
        }
        return false;
    }
        
    
}
module.exports = Product;