import jwt from "jsonwebtoken";

const generateToken = (userId,res)=>{
    const token = jwt.sign({id: userId}, process.env.JWT_SECRET, {
        expiresIn: "7d"
    });
    res.cookie("jwt", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development", // Use secure cookies in production
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });
    return token;
}

export { generateToken };