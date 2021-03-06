const express = require("express");
const mongoose = require("mongoose");
const morgan = require('morgan');
const productRouter = require('./route/product');
const userRouter = require('./route/users');
const uploadRouter = require('./route/upload');

const dotenv = require('dotenv').config();
const auth = require('./middleware/auth');


const cors = require('cors');


const app = express();

app.use(morgan('tiny'));
app.use(express.json());
app.options('*', cors());
app.use(express.urlencoded({extended: true }));


app.use(express.static(__dirname + "/public"));

mongoose.connect(process.env.URL, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
    .then((db) => {
        console.log("Successfully connected to MongodB server");
    }, (err) => console.log(err));

    app.use('/product', productRouter);
    app.use('/users', userRouter);
    app.use('/upload', uploadRouter);
    app.use(auth.verifyUser);
   
    app.use((err, req, res, next) => {
        console.error(err.stack);
        res.statusCode = 500;
        res.json({ status: err.message });
    });

    app.listen(process.env.PORT, () => {
        console.log(`App is running at localhost:${process.env.PORT}`);
    });

    