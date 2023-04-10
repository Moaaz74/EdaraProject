const Supervisor = require("../Models/supervisor")
const bcrypt = require('bcrypt');
const crypto = require('crypto');

class supervisorcontroller {


    static async getallsupervisor(req, res) {
        const supervisor = new Supervisor("Supervisor");
        var result = await supervisor.getallsupervisor();

        if (result.length==0){
            res.status(404).json( { msg: " not found Supervisor " } );

        }
        else {
            res.send(result)

        }
        //res.send(result)
    } ;

    static async createsupervisor(req, res) {
        const supervisor = new Supervisor("Supervisor");
        supervisor.name = req.body.name;
        supervisor.email = req.body.email;
        supervisor.phone = req.body.phone;
        const password = req.body.passward;
        const hashpassward = await bcrypt.hash(password,10);
        supervisor.passward = hashpassward;
        const randomtoken = crypto.randomBytes(16).toString("hex");
        supervisor.token = randomtoken;
        var result = await supervisor.createsupervisor();
        if (result == "error") {
            res.status(201).json({ msg: "Email is duplicate" });
        }
        else {
            res.status(200).json({ msg: "done" });
        }} ;


        static async getsupervisor(req, res) {
            const result = await Supervisor.getsupervisor(req.params.id);
            if (result.length==0){
                res.status(404).json({ error: [{ msg: "Supervisor not found" }] });

            }
            else {
                res.send(result)

            }
            
        } ;







}
module.exports = supervisorcontroller 
