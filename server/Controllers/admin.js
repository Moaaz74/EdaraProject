const {Admin,request} = require('../Models/admin');
const {body,validationResult} =require('express-validator');
const admin = new Admin('Admin');

class AdminController{

async updateSupervisor(req,res){
admin.state= req.body.state;
admin.name = req.body.name;
admin.email = req.body.email;
admin.phone = req.body.phone;
   const result =   await admin.updateSupervisor(req.params.id); 
   if(result!="Supervisor is updated")
   res.status(403).json({ msg : result});
   else 
   res.json({ msg : result});
}

async deleteSupervisor(req,res){
 const result = await admin.deleteSupervisor(req.params.id);
 if(result=="Supervior is deleted")
 
 res.json({
     msg : result
});
else if(result =="ERROR can not delete admin!!!")
res.status(400).json({
     msg : result
});
 else
 res.status(404).json({
     msg : result
});

  
}

async showPendingRequests(req,res){
var result = await admin.showPendingRequests();
if(result=="ERROR")
res.status(404).json({
     msg : "ERROR can not find"
});

else
res.send(result);
}

async showAllRequests(req,res){
     var result = await admin.showAllRequests();
     if(result=="ERROR")
     res.status(404).json({
          msg : "ERROR can not find"
     });
     
     else
     res.send(result);
     }
     

async updateRequest(req,res){
     request.approval=req.body.approval;
   const result = await admin.updateRequest(req.params.id); 
 if(result=="Request is updated" || result=="Request and product stock are updated" )
 res.json({
     msg : result
});
 else
 res.status(404).json({ msg : result});


   }

   async deleteRequest(req,res){
    const result =  await admin.deleteRequest(req.params.id);
     if(result=="ERROR request does not exist")
 res.status(404).json({
      msg : result
 });
 
 else
 res.json({
      msg : result
 });
  
   }


}
const adminc = new AdminController();
module.exports = adminc;