const {body,validationResult} =require('express-validator');
const Warehouse = require('../Models/warehouse');
const warehouse = new Warehouse('Warehouse');
const Supervisor = require('../Models/supervisor');


class WarehouseController{

    async getWarehouses(req , res){

        try{
            // VALIDATION REQUEST
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            // GET ALL WAREHOUSES
            const warehouses = await warehouse.getWarehouses();
            res.status(200).send(warehouses);
    
        }catch(err){
            res.status(500).json({ err: err });
        }
    };


    async getSpecificWarehouse(req , res){

        try{
            // VALIDATION REQUEST
            const errors = validationResult(req);
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
            if(result.length != 0)res.status(400).json({msg : "Warehouse name is already exists"});

            // CHECK SUPERVIOSR EXISTS OR NOT
            const supervisor = await Supervisor.getsupervisor(req.body.supervisorId);
            if(supervisor.length == 0)res.status(404).json({msg : "Superviosr is not exists"});

            // CHECK IF THE SUPERVISOR ALREADY HAS BEEN ASSIGNED A WAREHOUSE
            const assigned = await WarehouseController.SupervisorAssignedWarehouse(req.body.supervisorId);
            if(assigned)res.status(403).json({msg : "Supervisor has already assinged a warehouse"}); 

            // PREPARE WAREHOUSE OBJECT
            const warehouseObject = { 
                name : req.body.name,
                location : req.body.location,
                supervisorId : req.body.supervisorId 
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
            // VALIDATION REQUEST
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() }); 
            }

            // CHECK IS THE WAREHOUSE EXISTS
            const exist = await warehouse.getWarehouseById(req.params.id);
            if(!exist[0])res.status(404).json({msg : "Warehouse is not exist"});

            // CHECK REPETITION OF NAMES
            const result = await WarehouseController.checkWarehouseNameDuplication(req.params.id,req.body.name);
            
            if(result)res.status(400).json({msg : "Warehouse name is already exists"});

            // CHECK SUPERVIOSR EXISTS OR NOT 
            const supervisor = await Supervisor.getsupervisor(req.body.supervisorId);
            if(supervisor.length == 0)res.status(404).json({msg : "Superviosr is not exists"});

            // CHECK IF THE SUPERVISOR ALREADY HAS BEEN ASSIGNED A WAREHOUE
            const assigned = await WarehouseController.SupervisorAssignedWarehouse(req.body.supervisorId,req.params.id);
            if(assigned)res.status(403).json({msg : "Supervisor has already assinged a warehouse"});

            // PREPARE WAREHOUSE OBJECT
            const warehouseObject = { 
                name : req.body.name,
                location : req.body.location,
                supervisorId : req.body.supervisorId  
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
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() }); 
            }

            // CHECK IS THE WAREHOUSE EXISTS
            const exist = await warehouse.getWarehouseById(req.params.id);
            if(!exist[0])res.status(404).json({msg : "Warehouse is not exist"});

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

    static async SupervisorAssignedWarehouse(supervisorId , warehouseId){
        const result = await  warehouse.getWarehouseBySupervisorId(supervisorId , warehouseId);
        if(result.length == 0)return false;
        return true;
    }

}

const warehouseExport = new WarehouseController(); 
module.exports = warehouseExport; 