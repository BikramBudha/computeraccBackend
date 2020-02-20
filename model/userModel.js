const mongoose= require('mongoose');
const userSchema=new mongoose.Schema({
    image: {
        type: String
    },
    email:{
        type:String,
        // require:true,
        unique:true
    },
    username: {
        type: String,
        // required: true,
        unique: true,
        minlength: 6
    },
    password: {
        type: String,
        // required: true
    },
   
    
    admin: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('User', userSchema);