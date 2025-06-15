import { User } from "../models/user.js"
import bcrypt from "bcrypt"
import { generateToken } from "../utils/generateToken.js"


export const register =  async (req,res) =>{

    // try{
        const {email, password, username} = req.body

    if(!email || !password || !username){
        res.status(403).json({
            success: false,
            message: "Missing Credentials"
        })
    }
 
    const userex = await User.findOne({email});

    if(userex){
        res.status(500).json({
            success:true,
            message: "User Already Exists"
        })
    }
     

    const hashpass = await bcrypt.hash(password,10);

    const user= await User.create({ 
        email,
        username,
        password: hashpass
    })

    const token = generateToken(user._id);

    res.status(200).json({
        success:true,
        message:"User Saved",
        token,
        user: {
            _id: user._id,
            email: user.email,
            username: user.username,
            }, 
    })

    

    
}


export const login = async (req,res)=>{

    const {email, password} = req.body;

    if(!password || ! email){
        res.status(403).json({
            message:"missing credentials",
            success:false,
            token,
            user: {
                _id: user._id,
                email: user.email,
                username: user.username,
                }, 
        })
    }

    const user = await User.findOne({email})

    const ismatch = bcrypt.compare(password,user.password);
    console.log("hello")

    const token = generateToken(user._id);

    ismatch?.then(()=>{

        res.status(200).json({
            message:"success",
            success:true,
            token,
        user: {
        _id: user._id,
        email: user.email,
        username: user.username,
        }, 
        })
        
    })

}