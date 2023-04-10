/* express app */
const express = require('express');
const app = express();

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


/* API routes */
 app.use('/api/admins' , admin,admins);
app.use('/api/supervisor',supervisors);
app.use('/api/warehouses' , warehouses);
app.use('/api/products',products);
app.use('/api/requests'  ,requests);
app.use('/api/Auth' , auth);

/* Run the App */
app.listen(3000 , "localhost" , () =>{
    console.log("server is running");
});






