const jwt = require ("jsonwebtoken")

const authMiddleware = async (req, res, next) => {
  const {token} = req.headers;
  if (!token) {
    return res.status(401).json({message: "Unauthorized Login"})
  }
  try {
    const token_decode = jwt.verify(token,process.env.JWT_SECRET);
    req.body.user._id = token_decode.id;
    next();
  } catch (error) {
    console.log(error);
    res.json({success:false, message:"Error"})
    
  }
}

module.exports = authMiddleware;