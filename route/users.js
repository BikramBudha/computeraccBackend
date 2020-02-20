const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../model/userModel');
const router = express.Router();
const auth = require('../middleware/auth');

router.post('/signup', (req, res, next) => {
    let password = req.body.password;
    bcrypt.hash(password, 10, function (err, hash) {
        if (err) {
            let err =  new Error('Could not hash!');
        err.status = 500;
        return next(err);
        }
        User.create({
            email:req.body.email,
            username: req.body.username,
            password: hash,
            image: req.body.image
        }).then((user) => {
            let token = jwt.sign({ _id: user._id }, process.env.SECRET);
            res.json({ status: "Signup success!", token: token });
        }).catch(next);
    });
});


router.post('/login', (req, res, next) => {
    console.log(req.body.email)
    console.log(req.body.password)
    User.findOne({ email: req.body.email })
        .then((user) => {
            if (user == null) {
                let err = new Error('User not found!');
                err.status = 401;
                return next(err);
            } else {
                bcrypt.compare(req.body.password, user.password)
                    .then((isMatch) => {
                        if (!isMatch) {
                            let err = new Error('Password does not match!');
                            err.status = 401;
                            return next(err);
                        }
                        let token = jwt.sign({ _id: user._id }, process.env.SECRET);
                        res.status(200)
                        res.json({code:200,status: 'Login success!', token: token });
                    }).catch(next);
            }
        }).catch(next);
});
router.get('/me', auth.verifyUser, (req, res, next) => {
    // res.json({ _id: req.user._id, email:req.body.email, username: req.user.username, image: req.user.image });
    User.findById({_id:req.user._id})
    .then((user)=>{
        res.send(user)
    }).catch((error)=>{
        res.status(500).send(error);
    })
});



router.post("/check",(req,res,next)=>{
    User.findOne({email: req.body.email})
    .then((user)=>{
        if (user == null) {
            res.json({status: "go ahead"})
        }else{
            let err = new Error('Email already registered!');
            err.status = 401;
            return next(err);
        }
    })
})

router.put('/update/:id',  (req, res, next) => {
    console.log("chalyo")
 User.findById(req.params.id)  
 .then((user)=>{
    user._id=req.params.id
    user.image=req.body.image
    user.email=req.body.email
    user.username=req.body.username
    user.password=req.body.password
  

    user.save()
    .then((user)=>{ 
        res.json(user)
    }).catch(next)
    })

    });



    router.delete('/delete/:id',  (req, res, next) => {
        User.findByIdAndDelete(req.userid)
            .then((user) => {
                res.json({ status: 'User deleted!', User: user })
            }).catch(next);
    });



module.exports = router;