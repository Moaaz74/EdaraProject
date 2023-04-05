const {Router} = require('express');
const express = require('express');
const router = express.Router();
const conn = require('../db/connection');

router.get('/' , (req , res) =>{
    conn.query("select * from movies" , (err , result , fields) =>{
        res.json(result);
    })
});

module.exports = router;