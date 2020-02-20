const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const PORT = 4000;
const userRoutes = express.Router();

let User = require('./models/user');
let Product=require('./models/product');
let Order=require('./models/order');
let Review=require('./models/review');
app.use(cors());
app.use(bodyParser.json());

// Connection to mongodb
mongoose.connect('mongodb://127.0.0.1:27017/users', { useNewUrlParser: true });
const connection = mongoose.connection;
connection.once('open', function() {
    console.log("MongoDB database connection established succesfully.");
})

// API endpoints

// Getting all the users
userRoutes.route('/').get(function(req, res) {
    User.find(function(err, users) {
        if (err) {
            console.log(err);
        } else {
            res.json(users);
        }
    });
});
// Getting all the products
userRoutes.route('/a').get(function(req, res) {
    Product.find(function(err, product) 
    {
        if (err) {
            console.log(err);
        } else {
            res.json(product);
        }
    });
});
// Getting all the orders
userRoutes.route('/a1').get(function(req, res) {
    Order.find(function(err, order) 
    {
        if (err) {
            console.log(err);
        } else {
            res.json(order);
        }
    });
});


// Adding a new user
userRoutes.route('/add').post(function(req, res) {
    let user = new User(req.body);
    user.save()
        .then(user => {
            res.status(200).json({'User': 'User added successfully'});
        })
        .catch(err => {
            res.status(400).send('Error');
        });
});

userRoutes.route('/add_products').post(function(req, res) {
    let product = new Product(req.body);
    product.save()
        .then(product => {
            res.status(200).json({'Product': 'Product added successfully'});

        })
        .catch(err => {
            res.status(400).send('Error');
        });
});



// Adding a new Review 


userRoutes.route('/add_review').post(function(req, res) {
    let review = new Review(req.body);
    review.save()
        .then(review => {
            res.status(200).json({'Review': 'Review added successfully'});
        })
        .catch(err => {
            res.status(400).send('Error');
        });
})


// Getting all the reviews
userRoutes.route('/a3').get(function(req, res) {
    Review.find(function(err, review) 
    {
        if (err) {
            console.log(err);
        } else {
            res.json(review);
        }
    });
});
userRoutes.route('/update-product').put(function(req, res) {
    
    let username=req.body.username;
    let productname=req.body.productname;
    let count=req.body.count;
    let status=req.body.status;
    Product.updateOne({username:`${username}`,productname:`${productname}`},{count:`${count}`,status:`${status}`},function(err,product){
        if(err){
         console.log("not updated");
        }
        else{
            console.log("updated successfuly");
            res.json(product);
        }
    })
    
});
userRoutes.route('/update_order_in_order').put(function(req, res) {
    let customername=req.body.customername;
    let vendorname=req.body.vendorname;
    let productname=req.body.productname;
    let quantity=req.body.quantity;
    Order.updateOne({customername:`${customername}`,vendorname:`${vendorname}`,productname:`${productname}`},{quantity:`${quantity}`},function(err,order){
        if(err){
         console.log("not updated");
        }
        else{
            console.log("updated successfuly");
            res.json(order);
        }
    })
    
});

// updating the user
userRoutes.route('/update_user').put(function(req, res) {
    let username=req.body.username;
    let type=req.body.type;
    let count=req.body.count;
    let sum=req.body.sum;
    User.updateOne({username:`${username}`,type:`${type}`},{count:`${count}`,sum:`${sum}`},function(err,user){
        if(err){
         console.log("not updated");
        }
        else{
            console.log("updated successfuly");
            res.json(user);
        }
    })
    
});





userRoutes.route('/update-product2').put(function(req, res) {
    let username=req.body.username;
    let productname=req.body.productname;
    let status=req.body.status;
    Product.updateOne({username:`${username}`,productname:`${productname}`},{status:`${status}`},function(err,product){
        if(err){
         console.log("not updated");
        }
        else{
            console.log("updated successfuly");
            res.json(product);
        }
    })
    
});
userRoutes.route('/update-product3').put(function(req, res) {
    let username=req.body.username;
    let productname=req.body.productname;
    let count=req.body.count;
    let status=req.body.status;
    Product.updateOne({username:`${username}`,productname:`${productname}`},{status:`${status}`,count:`${count}`},function(err,product){
        if(err){
         console.log("not updated");
        }
        else{
            console.log("updated successfuly");
            res.json(product);
        }
    })
    
});
// Getting a user by id
userRoutes.route('/check1').post(function(req, res) {
    let boddy=req.body;
    Product.findOne(boddy, function(err, product) {
        res.json(product);
    });   
});

// Add Orders in the database
userRoutes.route('/add_order').post(function(req, res) {
    let order = new Order(req.body);
    order.save()
        .then(order => {
            res.status(200).json({'Order': 'Order added successfully'});

        })
        .catch(err => {
            res.status(400).send('Error');
        });
});



// Getting a user by id
userRoutes.route('/check').post(function(req, res) {
    let boddy=req.body;
    User.findOne(boddy, function(err, user) {
        res.json(user);
    });   
});
userRoutes.route('/checkproduct').post(function(req, res) {
    let boddy=req.body;
    Product.findOne(boddy, function(err, product) {
        res.json(product);
    });   
});
userRoutes.route('/searchproduct').post(function(req, res) {
    let boddy=req.body;
    User.findOne(boddy, function(err, user) {
        res.json(user);
    });   
});
app.use('/', userRoutes);
app.listen(PORT, function() {
    console.log("Server is running on port: " + PORT);
});