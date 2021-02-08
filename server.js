require('dotenv').config();
const express = require('express');
const cors = require('cors');
const authRouter = require('./src/routers/auth.router');
const usersRouter = require('./src/routers/user.router');
const { addUsersToDB } = require('./src/modules/user/user.service');

const corsOptions = {
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204
};

// Connection setup with MongoDB
const dbConnection = require('./src/config/database.config');

// Adding external Random user data into DB
addUsersToDB((error, status) => {
    if (error) {
        console.log(error);
    } else {
        console.log(status);
    }
});

// Creating an express app
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));

// Adding routes
app.use('/api/v1.0', authRouter);
app.use('/api/v1.0', usersRouter);


// Creating server on Port 3000
app.listen(process.env.APP_PORT || 3000, () => {
    console.log("Server is running on port 3000");
});