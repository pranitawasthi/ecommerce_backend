import express from "express"
import dotenv from "dotenv"
import connectdb from "./db/db.js";
import cors from "cors"
import router from "./routes/authrouter.js";
import storerouter from "./routes/storerouter.js";
import productrouter from "./routes/productrouter.js";
import { protect } from "./middlewares/authmiddleware.js";

const app = express();
dotenv.config();
connectdb();  
    
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/",router);
app.use("/store",storerouter);
app.use("/product",productrouter)

app.listen(process.env.PORT,()=>{
    console.log(`Server is running on ${process.env.PORT}`)
});
   