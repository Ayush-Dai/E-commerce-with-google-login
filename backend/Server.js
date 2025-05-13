require('dotenv').config();
const express = require("express");
const connectToDB = require('./database/db');
const authRouter = require('./Routes/authRouter');
const productRoter = require('./Routes/productRoutes');
const userRouter = require("./Routes/UserRoutes");
const orderRouter = require("./Routes/orderRoutes");
const cookieParser = require('cookie-parser');
const adminRoutes = require('./Routes/adminRoutes');

const cors = require('cors');
const app = express();

// Middleware
const corsOptions = {
    origin: 'http://localhost:5173',// React application's origin  
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
    credentials: true,   // Allow credentials (cookies)
    optionsSuccessStatus: 200,// Some legacy browsers choke on 204 
    allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static('Upload'));



//routes
app.use('/api/auth', authRouter);
app.use('/api', productRoter);
app.use('/api', userRouter);
app.use('/api/adminauth', adminRoutes);
app.use('/api/Order', orderRouter)



//database
connectToDB();




//server start
PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})