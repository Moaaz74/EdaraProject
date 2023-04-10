const db = require('../db/connection')

class user {
    name = '';
    email = '';
    type = 'supervisor';
    passward = '';
    state = 'Active';
    id;
    token = "" ;


    constructor(type) {
        this.type = type;

    }


    authenticateUser(eamil) {
        return new Promise((resolve, reject) => {
            const query = ' SELECT * FROM user WHERE email = ? ';
            db.query(query, [eamil], (error, result) => {
                if (error) {
                    resolve(error);
                }
                else {

                    resolve(result);
                }
            })
        });
    }



    userdata(token) {
        return new Promise((resolve, reject) => {
            console.log(eamil)
            const query = ' SELECT * FROM user WHERE token = ? ';
            db.query(query, [token], (error, result) => {
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

module.exports = user; 
