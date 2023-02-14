require('dotenv').config()
var jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
  try{
    const tokenCheck = req.headers.authorization
    if(!tokenCheck){
      return res.status(403).json({status: 403, message: 'Unauthorized. Please Login! or try again Later'});
    }else {
      try{
    const token = req.headers.authorization.split(' ')[1];
        var decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded
      }catch(err){
        return res.status(500).json({status: 500, message: "Sesson Time Out. Please Login Again"})
      }
      return next()
    }
  
  }
  catch(err){
    return res.status(500).json({status: 500, message: err.message})
  }

}


module.exports = {
  auth,
}