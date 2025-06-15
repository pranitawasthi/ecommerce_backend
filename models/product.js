import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String, 
    default: '',
    trim: true,
  },
  category: {
    type: String,
    required: true,
    enum: ['Electronics', 'Fashion', 'Home', 'Beauty', 'Food'], // your categories
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  discount: {
    type: Number,
    default: 0,
    min: 0,
    max: 100,
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5,
  },
  image: {
    type: String,
    required: true,
  },
  store: {
    type: String,  // Reference to Store collection
    required: true,
  }
  // store: {
  //   type: mongoose.Schema.Types.ObjectId,  // Reference to Store collection
  //   ref: 'Store',
  //   required: false,
  // }
}, { 
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
});

// Virtual for discounted price
productSchema.virtual('discountedPrice').get(function() {
  return this.price * (1 - this.discount / 100);
});

// Indexes to optimize queries
productSchema.index({ category: 1 });
productSchema.index({ store: 1 });

const Product = mongoose.model('Product', productSchema); 

export default Product;
