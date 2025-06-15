import Product from '../models/product.js';
import Store from '../models/store.js';
 
// Create a new product
export const createProduct = async (req, res) => {
  try {
    const { name, description, category, price, discount, rating, image, store } = req.body;

    if (!name || !category || !price || !image) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    const newProduct = await Product.create({ name, description, category, price, discount, rating, image, store });

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      product: newProduct,
    });
  } catch (error) {
    console.error("Create product error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Get all products
export const getAllProducts = async (req, res) => {
  try {
    console.log("hvhvuvhvhu")
    const products = await Product.find().populate('store','name image')
    console.log(products); 
    res.status(200).json({ success: true, products });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching products" });
  }
};

// Get product by ID
export const getProductById = async (req, res) => { 
  try {
    const product = await Product.findById(req.params.id)
    if (!product) return res.status(404).json({ success: false, message: "Product not found" });

    res.status(200).json({ success: true, product });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching product" });
  }
};
  