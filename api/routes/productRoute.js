const express = require("express");
const cors = require("cors");
const router = express.Router();
const app = express();

const {
    getItems,
    addItem,
    editItem,
    deleteItem

} = require("../controllers/productController");

app.use(cors());

// using the APIs

router.post("/api/products/add", addItem);
router.put("/api/products/edit/:id", editItem);
router.delete("/api/products/delete/:id", deleteItem);
router.get("/api/products/", getItems);



module.exports = router;
