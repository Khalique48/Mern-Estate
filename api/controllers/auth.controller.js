import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { errorHandler } from "../utils/error.js";

// created  a new user with hashed password
export const signup = async (req, res) => {
 const { username, email, password } = req.body;
 const hashedPassword = bcryptjs.hashSync(password, 10)
 const newUser = new User({ username, email, password: hashedPassword });
 try{
    res.status(201).json("User Created Successfully") 
    await newUser.save()
 } catch (error){
  next(error);
 }
};

//  authenticate the user by comparing the entered password to the saved one in database

export  const signin = async (req, res, next) => {
   const { email, password } = req.body;
   try{
      const validUser = await User.findOne({email});
      if(!validUser) return next(errorHandler(404,"User not found!"));
      const validPassword = bcryptjs.compareSync(password, validUser.password);
      if (!validPassword) return next(errorHandler(401, "Wrong Credentials"));
      const token = jwt.sign({id: validUser._id},process.env.JWT_SECRET);
      const{ password: pass, ...rest} = validUser._doc;
      res.cookie('access_token',token,{httpOnly:true}).status(200).json(rest);
   }catch(error){
      next(error);

   }
}
