const mongoose = require('mongoose');

let User = new mongoose.Schema({
    username: {
        type: String
    },
    email: {
        type: String
    },
    type :{
        type:String
    },
    count:{
        type:Number
    },
    sum:{
        type:Number
    }
});

module.exports = mongoose.model('User', User,'user');
