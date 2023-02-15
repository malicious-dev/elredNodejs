
require('dotenv').config();
const User = require('../models/user')
const OtpModel = require('../models/otp')
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const saltRounds = 15;

let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD
  }
});

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
    const otp = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
    if(!email ||!password) {
      return res.status(401).json({status: 401, message: 'Please fill all fields'})
    }
    const user = await User.findOne({email})
    if (user){
      bcrypt.compare(password, user.password, async function(err, result) {
        if (result) {
          try{
            const token = jwt.sign({id: user._id, Role: user.role}, process.env.JWT_SECRET, {expiresIn: '1h'})
         
            const output3 = `
            <h3>Your OTP given below </h3> <h1 style="color: red">${otp}</h1>
            <p>Note* - Otp will be valid for 10 minutes</p>
            <h3>Thank you!!</h3>`;


          let mailOptions = {
            from: 'Programming2hars@gmail.com',
            to: email,
            subject: 'Your OTP for Login',
            html: output3,
        };
        await transporter.sendMail(mailOptions);
        await OtpModel.findOneAndDelete({email})
        await OtpModel.create({
          email,
          otp,
        })
            res
               .cookie('access_token', token, {
            httpOnly: true, 
          })
            .json({status: 200, message: "Login Successfully!!"})
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

const logout = async(req, res) => {
  try{
    res.clearCookie('access_token')
    res.status(200).json({status: 200, message: "Logout Successfully!!"})
  }
  catch(error){
    return res.status(400).json({status: 400, message: error.message})
  }
}

const verifyOtp = async(req, res) => {
  try{
    const {email, otp} = req.body;
    const otpDdata = await OtpModel.findOne({email})
    console.log(otpDdata)
    if(otpDdata){
      if(otpDdata.otp == otp){
        await OtpModel.findByIdAndDelete(otpDdata._id)
        return res.status(200).json({status: 200, message: "Otp Verified Successfully!!"})
      }else {
        return res.status(401).json({status: 401, message: "Invalid Otp!!"})
      }
    }else {
      return res.status(401).json({status: 401, message: "Otp is not generated!!"})
    }
  } catch(error){
    return res.status(400).json({status: 400, message: error.message})
  }
}


module.exports = {
  register,
  login,
  logout,
  verifyOtp,
}