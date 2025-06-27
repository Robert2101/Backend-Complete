import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../config/utils.js";

const signup = async (req,res)=>{
    const {fullName , email , password}=req.body

    try{
        if(!fullName || !email || !password){
            return res.status(400).json({message : "Please fill all the fields"});
        }

        if(password.length < 6){
            return res.status(400).json({message : "Password must be at least 6 characters long"});
        }
        const user = await User.findOne({email});
        if(user){
            return res.status(400).json({message : "User already exists"});
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = User({
            fullName,
            email,
            password: hashedPassword
        })

        if(newUser){
            generateToken(newUser._id, res);
            await newUser.save();
            return res.status(201).json({message : "User created successfully", id: newUser._id , name: newUser.fullName, email: newUser.email});
        }else{
            return res.status(400).json({message : "User creation failed"});
        }
    }catch(err){
        console.error("error in signup:", err);
        return res.status(500).json({message : "Internal server error"});
    }
}

const login = async (req,res)=>{
    const {email, password} = req.body;
    try{
        if(!email || !password){
            return res.status(400).json({message : "Please fill all the fields"});
        }

        const user = await User.findOne({email})
        if(!user){
            return res.status(400).json({message : "Invalid credentials"});
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if(!isPasswordCorrect){
            return res.status(400).json({message : "Invalid credentials"});
        }
        generateToken(user._id, res);

        res.status(200).json({message : "Login successful", id: user._id, name: user.fullName, email: user.email});
    } catch(err){
        console.error("error in login:", err);
        return res.status(500).json({message : "Internal server error"});
    }
}

const logout = (req,res)=>{
    try{
        res.cookie("jwt", "",{maxAge : 0});
        res.status(200).json({message : "Logout successful"});
    }catch(err){
        console.error("error in logout:", err);
        return res.status(500).json({message : "Internal server error"});
    }
}

export {signup,login,logout};