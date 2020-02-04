const mongoose=require('mongoose');

const ProductSchema=new mongoose.Schema({
    brand:{
        type:String,
        require:true,
        unique:true
    },
    productName: {
        type: String,
        required: true,
        
    },
    price: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    discription: {
        type:String
    }
    
   
});

module.exports = mongoose.model('User', userSchema);