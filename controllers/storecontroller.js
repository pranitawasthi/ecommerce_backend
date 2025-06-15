import Store from "../models/store.js";
import Product from "../models/product.js";
import e from "express";

// Create a new store
export const createStore = async (req, res) => {
  try {
    const {
      name,
      image,
      rating,
      reviewCount,
      location, 
      categories,
      description,
      websiteUrl
    } = req.body;

    if (!name || !image) {
      return res.status(400).json({ success: false, message: "Name and image are required." });
    }

    const newStore = await Store.create({
      name,
      image,
      rating,
      reviewCount,
      location,
      categories,
      description,
      websiteUrl
    });

    res.status(201).json({ success: true, message: "Store created successfully", store: newStore });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};
 
// Get all stores 
// export const getAllStores = async (req, res) => {
//   try {
//     const stores = await Store.find().sort({ createdAt: -1 });
//     res.status(200).json({ success: true, stores });
//   } catch (error) {
//     res.status(500).json({ success: false, message: "Failed to fetch stores", error: error.message });
//   }
// };

// Get all stores with their products
export const getAllStores = async (req, res) => {
  try {
    console.log("ooyee")
    const stores = await Store.find().sort({ createdAt: -1 });

    // Populate each store with its products
    const storesWithProducts = await Promise.all(
      stores.map(async (store) => {
        const products = await Product.find({ store: store._id });
        return { ...store.toObject(), products };
      })
    );

    res.status(200).json({ success: true, stores: storesWithProducts });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch stores", error: error.message });
  }
};


// Get a single store by ID
// export const getStoreById = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const store = await Store.findById(id);

//     if (!store) {
//       return res.status(404).json({ success: false, message: "Store not found" });
//     }

//     res.status(200).json({ success: true, store });
//   } catch (error) {
//     res.status(500).json({ success: false, message: "Error fetching store", error: error.message });
//   }
// };

// Get a single store by ID with its products
export const getStoreById = async (req, res) => {
  try {
    const { id } = req.params;
    const store = await Store.findById(id);

    if (!store) {
      return res.status(404).json({ success: false, message: "Store not found" });
    }

    const products = await Product.find({ store: id });

    res.status(200).json({
      success: true,
      store: {
        ...store.toObject(),
        products,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching store", error: error.message });
  }
};



export const getStoreByName = async (req, res) => {
  try {
    console.log("popopopop")
    const { name } = req.params;
    const store = await Store.findOne({ name });

    if (!store) {
      return res.status(404).json({ success: false, message: "Store not found" });
    }

    const products = await Product.find({ store: store._id });

    res.status(200).json({
      success: true,
      store: {
        ...store.toObject(),
        products,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching store", error: error.message });
  }
};



// Update a store by ID
export const updateStore = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedStore = await Store.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedStore) {
      return res.status(404).json({ success: false, message: "Store not found" });
    }

    res.status(200).json({ success: true, message: "Store updated", store: updatedStore });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to update store", error: error.message });
  }
};

// Delete a store by ID
export const deleteStore = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedStore = await Store.findByIdAndDelete(id);

    if (!deletedStore) {
      return res.status(404).json({ success: false, message: "Store not found" });
    }

    res.status(200).json({ success: true, message: "Store deleted", store: deletedStore });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to delete store", error: error.message });
  }
};
