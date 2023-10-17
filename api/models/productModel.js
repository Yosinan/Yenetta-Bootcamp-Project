const mongoose = require('mongoose');

// Create a Mongoose schema for products

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    quantity: {

        type: Number,
        required: true,
    },
    dateAdded: {
        type: Date,
        default: Date.now,
    },

});

productSchema.set("toJSON",
    {
        transform: (_, obj) => {
            obj.id = obj._id;
            delete obj._id;
            delete obj.__v;

        },
    })

// Create a Mongoose model for products
const Product = mongoose.model('Product', productSchema);

module.exports = Product;