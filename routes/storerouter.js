import express from "express";
import {
  createStore,
  getAllStores,
  getStoreById,
  updateStore,
  deleteStore,
  getStoreByName,
} from "../controllers/storecontroller.js"

const storerouter = express.Router();

storerouter.post("/", createStore);
storerouter.get("/", getAllStores);
storerouter.get("/:id", getStoreById);
storerouter.put("/:id", updateStore);
storerouter.get('/stores/name/:name', getStoreByName);
storerouter.delete("/:id", deleteStore);

export default storerouter;
