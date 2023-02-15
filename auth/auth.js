require('dotenv').config()
var jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
  try{
    const token = req.cookies.access_token;
    if(!token){
      return res.status(403).json({status: 403, message: 'Unauthorized. Please Login! or try again Later'});
    }else {
      try{
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