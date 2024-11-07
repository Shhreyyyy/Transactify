const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");

const authMiddleware = (req,res,next) => {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer')) {
        return res.status(403).json({
            message: "authentication failed"
        });
    }

    const tokenArray = authHeader.split(" ");
    const token = tokenArray[1];

    try {
        const decodedValue = jwt.verify(token, JWT_SECRET);

        if (decodedValue.userId) {
            req.userId = decodedValue.userId;
            next();
        } else {
            return res.status(403).json({
                message: "Authentication failed"
            })
        }
        
    } catch (e) {
        return res.status(403).json({
            message: "Authentication failed"
        });
    }

    
}

module.exports = {
    authMiddleware
}