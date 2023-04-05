const express = require('express');
const app = express();
const users = require('./routes/users');

app.use('/api/users' , users);

app.get('/' , (req , res) =>{
    res.send("hello from index");
});

app.listen(3000);