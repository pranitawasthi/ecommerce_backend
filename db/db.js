import mongoose from "mongoose";

const connectdb = async ()=>{
    await mongoose.connect("mongodb+srv://pranitawasthi03:Snwa4jczzJXDNDoh@ecommerce.rqsjhvn.mongodb.net/test").then(()=>{
    console.log("Database Connected....")
})}

export default connectdb;
