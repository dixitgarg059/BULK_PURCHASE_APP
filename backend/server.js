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

// Add Orders in the database
userRoutes.route('/add_order').post(function(req, res) {
    console.log("in");
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