const express = require('express');
// const bcrypt = require('bcryptjs');
 const jwt = require('jsonwebtoken');
const product = require('../model/productModel');
const router = express.Router();
// const auth = require('../middleware/auth');

router.post('/', (req, res, next) => {
     product.create({
            image: req.body.image,
            brand:req.body.brand,
            productName: req.body.productName,
            price:req.body.price,
            phoneno:req.body.phoneno
           
        }).then(() => {
            //let token = jwt.sign({ _id: product._id }, process.env.SECRET);
            res.json({ status: "Product Added!" });
        }).catch(next);


    
});

router.get('/', (req, res) => {
    product.find()
    .then((products)=>{
        res.status(200).send(products);
    }).catch((error)=>{
        res.status(400).send(error);
    })
}); 

router.get('/:id', (req, res) => {
    product.findById({_id:req.params.id})
    .then((products)=>{
        res.status(200).send(products);
    }).catch((error)=>{
        res.status(400).send(error);
    })
}); 
// route.route("/getProduct")
//    .get((req, res, next)=>{
//      const data = productmodel.find({})
//      res.json(data
//     //    success:true,
//     //    data:data
//      )
//    });

  




 module.exports = router;