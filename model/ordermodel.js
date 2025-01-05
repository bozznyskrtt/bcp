const { Timestamp } = require('bson');
const mongoose = require('mongoose');

const itemSchema = mongoose.Schema(
    {
        menuItem: { type: String, required: true },
        amount: { type: Number, required: true },
    }
)

const orderSchema = mongoose.Schema(
    {
        orderId: { type: Number, required: true },
        customerName: { type: String, required: true },
        orderDate: { type: Date, default: Date.now },
        items: [itemSchema], // Array of items
        status: { type: Boolean, required: true }
    },
    {
        timestamps: true 
    }
)

const order = mongoose.model('Order', orderSchema);

module.exports = order;