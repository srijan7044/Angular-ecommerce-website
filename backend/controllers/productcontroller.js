const Product = require('../modules/product');

// Get all products
const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Add new product
const addProduct = async (req, res) => {
  try {
    const { name, price, image, description, category } = req.body;

    // Input validation
    if (!name || !price || !image || !description || !category) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const newProduct = new Product({ name, price, image, description, category });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    console.error('Error saving product:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete product
const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getProducts, addProduct, deleteProduct };
