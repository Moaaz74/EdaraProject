const {body,validationResult} =require('express-validator');
const Auth = require('../Models/auth');
const auth = new Auth();
const bcrypt = require('bcrypt')

class AuthController{
    
    async authinticateUser(req , res){
        try {
            // 1- VALIDATION REQUEST [manual, express validation]
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            // 2- CHECK IF EMAIL EXISTS
            
            const user = await auth.getUserByEmail(req.body.email);
            if (user.length == 0) {
                res.status(404).json({
                errors: [
                    {
                    msg: "email or password not found !",
                    },
                ],
                });
            }

            // 3- COMPARE HASHED PASSWORD
            const checkPassword = await bcrypt.compare(
                req.body.password,
                user[0].password
            );
            if (checkPassword) {
                delete user[0].password;
                res.status(200).json(user[0]);
            }else {
                res.status(404).json({
                errors: [
                    {
                    msg: "email or password not found !",
                    },
                ],
                });
            }
        } catch (err) {
            console.log(err);
        res.status(500).json({ err: err });
        }
    }

    
}

const authExport = new AuthController();
module.exports = authExport;