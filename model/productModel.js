const mongoose=require('mongoose');

const productSchema=new mongoose.Schema({
    image:{
        type:String,
        require:true

    },
    brand: {
        type: String,
        required: true,
        unique:true
        
    },
    productName: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    phoneno: {
        type: String,
        required: true
    }
   
   
    
    
   
});

module.exports = mongoose.model('Product', productSchema);