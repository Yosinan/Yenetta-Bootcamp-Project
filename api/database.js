const mongoose = require("mongoose");
const { DB_URI } = require("./config");

// connect to MongoDB
const start = async () => {
    try {
        await mongoose.connect(DB_URI,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error(error);
    }
}

const counterSchema = new mongoose.Schema({
    _id: { type: String, required: true },
    seq: { type: Number, default:  0}
});

const Counter = mongoose.model('Counter', counterSchema);

async function initCounter() {
    // Check if the counter document exists
    const counter = await Counter.findById('product_counter');

    if (!counter) {
        // If the counter document doesn't exist, create it with an initial value of 1
        await Counter.create({ _id: 'product_counter', seq: 1 });
    }
}

module.exports = {  Counter, initCounter };
module.exports = start;