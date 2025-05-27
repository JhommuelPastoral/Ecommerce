import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

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
        sameSite: 'none'
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
        sameSite: 'none'
      });
      return res.status(200).json({message: "Login successful"});

    }


  } catch (error) {
    // console.log(error);
    
  }

}