
require('dotenv').config();
const User = require('../models/user')
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const saltRounds = 15;

const register = async (req, res) => {
  try {
    const {fullname, email, password} = req.body;
    if(!fullname || !email || !password) {
      return res.status(401).json({status: 401, message: 'Please fill all fields'})
    }
    const user = await User.findOne({email})
    if (user){
      return res.status(401).json({status: 401, message: 'Email already exists. Please Login.'})
    }
    bcrypt.hash(password, saltRounds, async function(err, hash) {
      // Store hash in your password DB.
      const user = await User.create({
        fullname,
        email,
        password: hash,
      })
    
      res.status(200).json({status: 200, message: "Register Succesfully.", data: user})
  });
   
  } catch (err) {
    res.status(400).json({status: 400, message: err.message})
  }
}


const login = async(req, res) => {
  try {
    const {email, password} = req.body;
    if(!email ||!password) {
      return res.status(401).json({status: 401, message: 'Please fill all fields'})
    }
    const user = await User.findOne({email})
    if (user){
      bcrypt.compare(password, user.password, function(err, result) {
        if (result) {
          try{
            const token = jwt.sign({id: user._id, Role: user.role}, process.env.JWT_SECRET, {expiresIn: '1h'})
            res
            .json({status: 200, message: "Login Successfully!!", token: token})
          }
          catch(error){
            return res.status(400).json({status: 400, message: error.message})
          }
    } else {
      return res.status(401).json({status: 401, message: "Invalid Password!!"})
    }
  
  }
    )
  }else {
    return res.status(401).json({status: 401, message: "Customer is not registered!!!"})
  }
}catch(error){
  return res.status(400).json({status: 400, message: error.message})
}
}


module.exports = {
  register,
  login
}