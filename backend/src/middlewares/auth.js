const jwt = require('jsonwebtoken');
const User = require('../models/user');



const userAuth = async (req, res, next) => {
    try{
        const {token} = req.cookies;
        if(!token){
            throw new Error("Token not found");
        }
        const decoded = jwt.verify(token,"Anmol@123");
       
    
        const user = await User.findById(decoded._id);
        if(!user){
            throw new Error("User not found");
        }
        req.user = user;
        next();

    }
    catch(err){  
        res.status(500).send("Error Authenticating user: " + err.message);
    }

}


module.exports = {
  userAuth,
};