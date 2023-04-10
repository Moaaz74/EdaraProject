const db = require('../db/connection')
const user = require("../Models/user")
class supervisor extends user {


    constructor(type) {
        super(type);
    }

    getallsupervisor() {
        return new Promise((resolve, reject) => {
            const query = ' SELECT * FROM user WHERE type = ? ';
            //const type = "supervisor" ;
            db.query(query, [this.type], (error, result) => {
                if (error) {

                    resolve(error);

                }
                else {
                    resolve(result);
                }
            })
        });
    }
    createsupervisor() {
        return new Promise((resolve, reject) => {
            const query = "insert into user (name,email,password,state,type,token,phone) values(?,?,?,?,?,?,?)";
            console.log(query)
            db.query(query, [this.name, this.email, this.passward, this.state, this.type, this.token, this.phone], (error, result) => {
                console.log(error)
                if (error) {
                    resolve("error");
                }
                else {
                    resolve(result);
                }
            })
        });
    }

     static async getsupervisor(id) {
        return new Promise((resolve, reject) => {
            const query = ' SELECT * FROM user WHERE id = ? and type = ?';
            const type = "supervisor" ;
            db.query(query, [id,type], (error, result) => {
                if (error) {

                    resolve(error);

                }
                else {
                    resolve(result);
                }
            })
        });
    }



}










module.exports = supervisor; 