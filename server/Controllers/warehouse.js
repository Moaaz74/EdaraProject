const {validationResult} =require('express-validator');
const Warehouse = require('../Models/warehouse');
const warehouse = new Warehouse('Warehouse');
const Supervisor = require('../Models/supervisor');


class WarehouseController{

    async getWarehouses(req , res){

        try{
            // GET ALL WAREHOUSES
            const warehouses = await warehouse.getWarehouses();
            res.status(200).send(warehouses);
    
        }catch(err){
            res.status(500).json({ err: err });
        }
    };

    async getWarehouseProducts(req , res){
        const products = await warehouse.getProducts(req.params.id);
        products.map((prod) => {
            prod.photo = "http://" + req.hostname + ":3000/" + prod.photo;
        });
        res.status(200).send(products);
    }


    async getSpecificWarehouse(req , res){

        try{
            // VALIDATION REQUEST
            const errors = validationResult(req.body);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() }); 
            }
            // GET WAREHOUSE 
            const warehouseRetrived = await warehouse.getSpecificWarehouse(req.params.id);
            if(warehouseRetrived === "Error")res.status(404).json({msg : "Warehouse is not found"})
            else res.send(warehouseRetrived);

        }catch(err){ 
            res.status(500).json({ err: err });
        } 
    }


    async createWarehouse(req , res){
        try{
            // VALIDATION REQUEST
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() }); 
            }

            // CHECK REPETITION OF NAMES
            const result = await warehouse.getWarehouseByName(req.body.name);
            if(result.length != 0)res.status(400).json({
                errors: [
                    {
                    msg: "Duplicate Warehouse Name !",
                    },
                ],
            });


            // CHECK SUPERVISOR EXISTS OR NOT
            const supervisor = await Supervisor.getsupervisorByEmail(req.body.email);
            if(supervisor.length == 0)res.status(404).json({
                errors: [
                    {
                    msg: "Supervisor is not exists !",
                    },
                ],
                });

            // CHECK IF THE SUPERVISOR ALREADY HAS BEEN ASSIGNED A WAREHOUSE
            const assigned = await WarehouseController.SupervisorAssignedWarehouse(req.body.email);
            if(assigned)res.status(403).json({ errors: [
                {
                msg: "Supervisor has already assigned a warehouse !",  
                },
            ],}); 

            // PREPARE WAREHOUSE OBJECT 
            const warehouseObject = { 
                name : req.body.name,
                location : req.body.location,
                state : req.body.state,  
                supervisorId : supervisor[0].id 
            }

            // CREATE NEW WAREHOUSE 
            const created = await warehouse.createWarehouse(warehouseObject);
            if(created == true)res.status(200).json({msg : "Warehouse created successfully"});
        }catch(err){
            res.status(500).json({ err: err });     
        }
    }


    async updateWarehouse(req , res){
        try{
            console.log(req);
            // VALIDATION REQUEST
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() }); 
            }
   
            // CHECK IS THE WAREHOUSE EXISTS 
            const exist = await warehouse.getWarehouseById(req.params.id);
            if(!exist[0])res.status(404).json({errors: [
                {
                msg: "Warehouse is not exists !",
                },
            ],});            

            // CHECK REPETITION OF NAMES
            const result = await WarehouseController.checkWarehouseNameDuplication(req.params.id,req.body.name);
            
            if(result)res.status(400).json({errors: [
                {
                msg: "Warehouse is already exists !",
                },
            ],});

           // PREPARE WAREHOUSE OBJECT  
           const warehouseObject = { 
               name : req.body.name,
               location : req.body.location,
               state : req.body.state,  
           }
 
            // UPDATE WAREHOUSE 
            await warehouse.upadateWarehouse(req.params.id,warehouseObject);
            res.status(200).json({msg : "Warehouse updated successfully"});            
        }catch(err){
            res.status(500).json({ err: err }); 
        }
    }


    async deleteWarehouse(req , res){
            try{
                // VALIDATION REQUEST
            const errors = validationResult(req.body);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() }); 
            }

            // CHECK IS THE WAREHOUSE EXISTS
            const exist = await warehouse.getWarehouseById(req.params.id);
            if(!exist[0])res.status(404).json({errors: [
                {
                msg: "Warehouse is not exists !",
                },
            ],});

            await warehouse.deleteWarehouse(req.params.id);
            res.status(200).json({msg : "Deleted Successfully"});
            }catch(err){
                res.status(500).json({ err: err });
            }
            
    }

    static async checkWarehouseNameDuplication(id,name){
        const result = await warehouse.getWarehouseByName(id,name);
        if(result.length != 0)return true;
        return false;
    }

    static async SupervisorAssignedWarehouse(email){
        const result = await  warehouse.getWarehouseBySupervisorEmail(email);
        if(result.length == 0)return false;
        return true;
    }

}

const warehouseExport = new WarehouseController();  
module.exports = warehouseExport; 