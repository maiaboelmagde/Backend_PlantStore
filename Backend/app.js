const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const app = express();
const DBListener = require('./Config/dbConnection'); 


const PORT = process.env.PORT || 3000;
app.use(bodyParser.json());
app.use(express.json());
const userRoute = require("../Backend/Routes/UserRoutes");
const payRoutes = require('./Routes/pay.Routes');
const orderRoutes = require('./Routes/order.Routes')
const potRoute = require('./Routes/Pot')
const reviewRoute = require('./Routes/reviewRoutes')
const favRoute = require('./Routes/favRoutes')
const cartRoute = require('./Routes/cartRoutes')
const plantRoute = require('./Routes/plantsRoutes')

// Allow requests from Angular frontend
const cors = require('cors');
app.use(cors({
    origin: 'http://localhost:4200',
    methods: ['GET', 'POST', 'PUT', 'DELETE','PATCH'],
    allowedHeaders: ['Content-Type', 'productId','Authorization']
}));

// Connect to MongoDB
DBListener.on('error',(err)=>{console.log(err)});

DBListener.once('open',()=>{

    console.log("✅ Connected to MongoDB"); 
    //All the routes will be here
    app.use("/users",userRoute);
    app.use('/pay', payRoutes);
    app.use('/orders', orderRoutes);
    app.use('/review', reviewRoute);
    app.use('/pot', potRoute);
    app.use('/plant', plantRoute);
    app.use('/cart', cartRoute);
    app.use('/fav', favRoute);

}); 


app.listen(PORT, () => { 
    console.log(`http://localhost:${PORT}`); 
}); 