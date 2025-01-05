const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Order = require('./model/ordermodel');

app.use(express.json());
//routes
mongoose.connect('mongodb+srv://bcpchapter2403:bosscaptainpear2403@bcp.mpfij.mongodb.net/KitchenOrder?retryWrites=true&w=majority&appName=bcp')
.then(() => {
    //connect to DB first then start the server
    console.log('Connected to MongoDB')
    app.listen(3000,()=> { 
        console.log("Node API running on port 3000")
    })
}) 
.catch((error) => {
    console.log(error)
})

app.get('/orders', async(req,res) =>{
    try {
        const order = await Order.find({});
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

app.get('/orders/:id', async(req,res) =>{
    try {
        const {id} = req.params;
        const order = await Order.findById(id);
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

app.post('/orders', async(req,res) => {
    try {
        const order = await Order.create(req.body);
        res.status(200).json(order);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});
    }
});

app.delete('/orders/:id', async(req,res) => {
    try {
        const {id} = req.params;
        const order = await Order.findByIdAndDelete(id);
        if(!order){
            return res.status(404).json({message: `Cannot find any order with ID ${id}`});
        }
        res.status(200).json(order);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});
    }
})

app.patch('/orders/:id', async(req,res) => {
    try {
        const {id} = req.params;
        const { menuItem, amount } = req.body;
        const order = await Order.findByIdAndUpdate(id, 
            {
                $set: {
                  "items.$[item].amount": amount,
                },
            },
            {
                arrayFilters: [{ "item.menuItem": menuItem }],
                new: true,
            }
        );
        // we cannot find any order in the database
        if (!order){
            return res.status(404).json({message: `Cannot find any order with ID ${id}`});
        }
        res.status(200).json(order);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});
    }
})

