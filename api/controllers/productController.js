const Product = require('../models/productModel');
const { Counter } = require('../database');
// Set up routes for products

// Add products 
const addItem = async (req, res) => {
    try {

        // const nextId = await Counter.findOneAndUpdate(
        //     { _id: 'product_counter' },
        //     { $inc: { seq: 1 } },
        //     { new: true, upsert: true }
        // );

        const product = new Product({
            // prodId: nextId.seq,
            name: req.body.name.toUpperCase(),
            description: req.body.description,
            price: req.body.price,
            quantity: req.body.quantity

        })

        const p = await product.save();
        if (!p) {
            
            return json.status(400).send("Product not saved");
        }
        res.status(201).json({ product, message: "Product Added Successfully"});
    
    }
    catch (err) {
        res.status(500).send("Error: " + err);
    }
};


// GET all products
const getItems = async (req, res, next) => {
    try {
        
        const products = await Product.find();
        if (products.length != 0){
        res.status(200).json(products);
        }
        else {
            res.status(404).json({message: 'No Products were found'});
        }
    } catch (err) {
        res.status(500).send("Error " + err);
    }

};


// DELETE a product by ID
const deleteItem = async (req, res, next) => {
    try {
        const productId = req.params.id;

        const product = await Product.findOne({ _id: productId });
        if (!product) {
            return res.status(404).send("Product not found");
        }

        await Product.deleteOne({ _id: productId });
        res.send("Product Deleted");
    } catch (err) {
        res.status(500).send("Error " + err.message);
    }
};



// Edit a product by ID 
const editItem = async (req, res, next) => {
    try {
        const productId = req.params.id;

        const product = await Product.findOne({ _id: productId });

        if (!product) {
            return res.status(404).send("Product not found or unauthorized to edit.");
        }

        product.set(req.body);
        const updatedProduct = await product.save();

        res.send(updatedProduct);
    } catch (err) {
        res.status(500).send("Error " + err);
    }
};


module.exports = {
    getItems,
    deleteItem,
    addItem,
    editItem,
}