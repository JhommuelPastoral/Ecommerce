import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import { comparePassword, hashPassword } from '../helpers/hash.js';

export const googleLogin = async (req, res) => {
  try {
    const data = req.body
    if(!data) return res.status(400).json({message: "No data provided"});

    const existUser = await User.findOne({email: data.email});

    if(existUser) {
      const token = jwt.sign({userId: existUser._id}, process.env.JWT_SECRET, {expiresIn: '7d' });
      res.cookie("token", token, {
        httpOnly: true,
        sameSite: 'none',
        secure: true,
        maxAge: 1000 * 60 * 60 * 24 * 7,
      });
      return res.status(200).json({message: "Login successful"});
    }
    else{
      const newUser = await User.create({name: data.displayName, email: data.email});
      const token = jwt.sign({userId: newUser._id}, process.env.JWT_SECRET, {expiresIn: '7d' });
  
      res.cookie("token", token, {
        httpOnly: true,
        sameSite: 'none',
        secure: true,
        maxAge: 1000 * 60 * 60 * 24 * 7,
      });
      return res.status(200).json({message: "Login successful"});

    }


  } catch (error) {
    console.log("Google login error", error);
    return res.status(500).json({message: "Internal server error"});
  }

}

export const login = async (req, res) => {
   try {
    const {email, password} = req.body;

    if(!email || !password){
      return res.status(400).json({message: "Email and password are required"});
    }

    const user = await User.findOne({email});
    const isMatch = await comparePassword(password, user.password);
    
    if(!user){
      return res.status(404).json({message: "User not found"});
    }
    if(!isMatch){
      return res.status(401).json({message: "Invalid credentials"});
    }

    const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET, {expiresIn: '7d' });
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });
    return res.status(200).json({message: "Login successful"});
   } catch (error) {
    console.log("Login Error: " + error);
    return res.status(500).json({message: "Internal server error"});
   }
}

export const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if(!user){
      return res.status(404).json({ message: "User not found" });
    }
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });
    return res.status(200).json({ message: "Login successful" });

  } catch (error) {
    console.error("User login error:", error);
    return res.status(403).json({ message: "Forbidden: Invalid token" });
  }
};


export const signup = async (req,res) =>{
  try {
    const {name, email, password} = req.body;
    if(!name || !email || !password){
      return res.status(400).json({message: "Name, email and password are required"});
    }
    const user = await User.findOne({email});
    if(user){
      return res.status(400).json({message: "User already exists"});
    }
    const hashedPassword = await hashPassword(password);
    const newUser = await User.create({name, email, password: hashedPassword, isOnboarded: true});
    const token = jwt.sign({userId: newUser._id}, process.env.JWT_SECRET, {expiresIn: '7d' });
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });
    return res.status(200).json({message: "Signup successful"});
  } catch (error) {
    console.log("Signup Error: " + error);
    return res.status(500).json({message: "Internal server error"});
  }
}

export const onboard = async (req,res)=>{

  try {
    const {password} = req.body;
    if(!password){
      return res.status(400).json({message: "Password is required"});
    }
    if(password.length < 6){
      return res.status(400).json({message: "Password must be at least 6 characters"});
    }
    const user = await User.findOne({email: req.user.email});
    if(!user){
      return res.status(404).json({message: "User not found"});
    }
    const hashedPassword = await hashPassword(password);
    user.password = hashedPassword;
    user.isOnboarded = true;
    await user.save();
    return res.status(200).json({message: "Onboarding successful"});
    
  } catch (error) {
    console.log("Onboarding Error: " + error);
    return res.status(500).json({message: "Internal server error"});
  }

}


export const logOut = ()=>{
  res.clearCookie("token",{
    httpOnly: true,
    sameSite: 'none',
    secure: true,
  });
  return res.status(200).json({message: "Logout successful"});
}