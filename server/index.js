/* express app */
const express = require('express');
const app = express();
const cors = require('cors');
/* required modules */
 const admins = require('./routes/Admin');
const warehouses = require ('./routes/warehouses');
const products = require('./routes/product');
 const supervisors = require('./routes/supervisor');
 const requests = require('./routes/Request');
const auth = require('./routes/Auth');
const admin = require('./middleware/admin');
const Auth = require('./middleware/auth');


app.use(express.json());
app.use(express.urlencoded({ extended: true })); // TO ACCESS URL FORM ENCODED
app.use(express.static("upload"));
app.use(cors());

/* API routes */
app.use('/admin' , admin,admins);
app.use('/supervisor',supervisors);
app.use('/warehouse' , warehouses);
app.use('/product',products);
app.use('/requests' ,Auth ,requests);
app.use('/Auth' , auth);

/* Run the App */
app.listen(3000 , "localhost" , () =>{
    console.log("server is running");
});






