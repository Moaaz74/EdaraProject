const conn = require('../db/connection');

const authorized = (req,res,next) => {
    const accessToken = req.headers.token;
    const query = ' SELECT * FROM user WHERE token = ? ';
            conn.query(query, [accessToken], (error, result) => {
                if(result[0]){
                    res.locals.user = result[0] ;
                    next();
                }
                else {
                    res.status(403).json({ msg: "you are not authorized to access this" });
                }
                
            })
    

}
module.exports = authorized;


