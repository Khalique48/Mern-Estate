import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';

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
