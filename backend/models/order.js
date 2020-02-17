const mongoose = require('mongoose');

let Order = new mongoose.Schema({
    customername: {
        type: String
    },
    vendorname:{
        type:String
    },
    productname:{
        type:String
    },
    quantity:{
        type:Number
    },
    status:{
        type:String
    }
});
module.exports = mongoose.model('Order', Order,'order');
