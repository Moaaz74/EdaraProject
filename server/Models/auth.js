const conn = require('../db/connection');
const util  = require('util');
const query = util.promisify(conn.query).bind(conn); // transform query mysql --> promise to use [await/async]

class Auth{

    constructor(){}

    async getUserByEmail(email){

        const user = await query("select * from user where email = ?", [email]);
        return user;
    }

}

module.exports = Auth;