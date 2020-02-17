const mongoose = require('mongoose');

let Product = new mongoose.Schema({
    username: {
        type: String
    },
    productname: {
        type: String
    },
    price: {
        type: Number
    },
    quantity :{
        type:Number
    }
});

module.exports = mongoose.model('Product', Product,'product');
