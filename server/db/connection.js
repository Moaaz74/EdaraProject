const mysql      = require('mysql');
const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'edaraproject',
    port : "3306",
});

connection.connect((err)=>{
    if(err){
        console.log("connection error");
        return;
    }
    console.log("connected successfully");
});

module.exports = connection;