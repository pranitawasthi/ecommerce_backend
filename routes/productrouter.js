import express from 'express';
import { createProduct, getAllProducts, getProductById } from '../controllers/prodcontroller.js';
import { getStoreByName } from '../controllers/storecontroller.js';

const productrouter = express.Router();

productrouter.post('/', createProduct);
productrouter.get('/', getAllProducts);
productrouter.get('/:id', getProductById);

export default productrouter;
  