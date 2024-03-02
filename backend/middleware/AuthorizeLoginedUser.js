const JWT = require('jsonwebtoken');

function AuthorizeLoginedUser(req, res, next) {
    const authHeader = req.headers.authorization;
    if(!authHeader){
        return res.status(401).json({message:"Unauthorized"});
    }
    const token = authHeader.split(' ')[1];
    try{
        const user=JWT.verify(token,process.env.JWT_SECRET);
        req.user=user.userID;
        next();
    }catch{
        return res.status(401).json({message:"Unauthorized"});
    }
}


module.exports = AuthorizeLoginedUser;