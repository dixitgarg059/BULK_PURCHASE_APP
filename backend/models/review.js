const mongoose = require('mongoose');

let Review = new mongoose.Schema({
    customername: {
        type: String
    },
    vendorname:{
        type:String
    },
    productname:{
        type:String
    },
    review:{
        type:String
    },
    rating:{
        type:String
    }
});
module.exports = mongoose.model('Review',Review,'review');
