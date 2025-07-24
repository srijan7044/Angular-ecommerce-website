const express = require('express');
const router = express.Router();
const { getProducts, addProduct, deleteProduct } = require('../controllers/productController');

// Get all products
router.get('/', getProducts);

// Add a product
router.post('/', addProduct);

// Delete a product by ID
router.delete('/:id', deleteProduct);

module.exports = router;
