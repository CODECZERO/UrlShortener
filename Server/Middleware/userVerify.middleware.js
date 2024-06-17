import jwt from "jsonwebtoken";
import UrlModel from "../Models/url.model.js";

const UserVerify= async (req,res)=>{
    try {
        const token=req.cookies?.accessToken
        if(!token){
            res.redirect("/user/Login")
        }
        const decryptToken=jwt.verify(token,process.env.ACCESS_TOKEN_SECRET);

        const finduser=await UrlModel.findById(decryptToken?._id).select("-password -refreshToken");
        if(!finduser){
            return res.status(400).json("Not Found");
        }
        req.user=finduser;
        next()

    } catch (error) {
        return res.status(500).json("Something wnet wrong while Verifying user");
    }
}

export default UserVerify