const express = require('express');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
const product = require('../model/productModel');
const router = express.Router();
// const auth = require('../middleware/auth');

router.post('/addProduct', (req, res, next) => {
     product.create({
            image: req.body.image,
            brand:req.body.brand,
            productName: req.body.productName,
            price:req.body.price
           
        }).then(() => {
            //let token = jwt.sign({ _id: product._id }, process.env.SECRET);
            res.json({ status: "Product Added!" });
        }).catch(next);
    
    
});


// router.post('/login', (req, res, next) => {
//     console.log(req.body.email)
//     console.log(req.body.password)
//     User.findOne({ email: req.body.email })
//         .then((user) => {
//             if (user == null) {
//                 let err = new Error('User not found!');
//                 err.status = 401;
//                 return next(err);
//             } else {
//                 bcrypt.compare(req.body.password, user.password)
//                     .then((isMatch) => {
//                         if (!isMatch) {
//                             let err = new Error('Password does not match!');
//                             err.status = 401;
//                             return next(err);
//                         }
//                         let token = jwt.sign({ _id: user._id }, process.env.SECRET);
//                         res.status(200)
//                         res.json({code:200,status: 'Login success!', token: token });
//                     }).catch(next);
//             }
//         }).catch(next);
// });
// router.get('/me', auth.verifyUser, (req, res, next) => {
//     res.json({ _id: req.user._id, email:req.body.email, username: req.user.username, image: req.user.image });
// });



// router.post("/check",(req,res,next)=>{
//     User.findOne({email: req.body.email})
//     .then((user)=>{
//         if (user == null) {
//             res.json({status: "go ahead"})
//         }else{
//             let err = new Error('Email already registered!');
//             err.status = 401;
//             return next(err);
//         }
//     })
// })



 module.exports = router;