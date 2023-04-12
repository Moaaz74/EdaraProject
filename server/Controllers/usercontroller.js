const UserModel = require("../Models/user")
const bcrypt = require('bcrypt');



class usercontroller {


    static async authenticateUser(req, res) {
        const user = new UserModel();
        var result = await user.authenticateUser(req.body.email);
        if (result.length > 0) {
            const hashPassword = result[0].passward;
            const checkpassward = await  bcrypt.compare(req.body.passward,result[0].passward);
           if (checkpassward) {
               delete result[0].passward;
               res.status(200).json({ data: result });
            }
           else {
                res.status(404).json({ error: [{ msg: " passward is not correct" }] });

            }
        }
        else {
            res.status(404).json({ error: [{ msg: "email is not found" }] });
        }


    }







}
module.exports = usercontroller

