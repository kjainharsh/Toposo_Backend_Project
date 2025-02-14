const jwt = require("jsonwebtoken");
const User = require("../models/user_models");

const authMiddleware = async (req, res, next) => {

    const token = req.header("Authorization");
    //console.log(token);


    if (!token) {
        // If you attempt to use an expired token, you'll receive a "401 Unauthorized HTTP" response.
        return res
            .status(401)
            .json({ message: "Unauthorized HTTP, Token not provided" });
    }
    const jwtToken = token.startsWith("Bearer ") ? token.slice(7).trim() : "";

    //console.log(jwtToken);
    try {
        const decoded = jwt.verify(jwtToken, process.env.JWT_SECRET_KEY);
        //console.log("Decoded Token:", decoded);

        const userData = await User.findOne({ email: decoded.email }).select({ password: 0 });
        req.user = userData;
        req.token = token;
        req.userID = userData._id;
        next();
    } catch (error) {
        //console.error("Token Verification Failed:", error);
        return res.status(401).json({ message: "Invalid token" });
    }

};
module.exports = authMiddleware;