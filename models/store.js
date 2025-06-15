import mongoose from 'mongoose';

const storeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  image: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5,
  },
  reviewCount: {
    type: Number,
    default: 0,
    min: 0,
  },
  location: {
    type: String,
    default: '',
    trim: true,
  },
  categories: {
    type: [String],
    default: [],
  },
  description: {
    type: String,
    default: '',
    trim: true,
  },
  phone:{
    type:Number
  },
  websiteUrl: {
    type: String,
    default: '',
  },
}, { timestamps: true });

const Store = mongoose.model('Store', storeSchema);

export default Store;
