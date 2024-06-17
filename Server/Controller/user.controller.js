import userModel from "../Models/user.model.js";
import mongoose from "mongoose";

//generate Access anf Refersh tokens for user 
const generateAccessAndRefereshTokens = async(userId) =>{
    try {
        const user = await userModel.findById(userId)
        const accessToken = user.genAccesToken();
        const refreshToken = user.genRefershToken();

        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })

        return {accessToken, refreshToken}


    } catch (error) {
        return (500, "Something went wrong while generating referesh and access token")
    }
}
 //Cookies options 
const options = {
    httpOnly: true,
    secure: true
}

const CreateUser=async(req,res)=>{
    const {FullName,UserName,email,password}=req?.body;

    if(!(FullName||UserName||email||password)){
        return res.status(400).json("Please Provide Value");
    }

    const existedUser = await userModel.findOne({
        $or: [{ UserName}, { email }]
    })

    if(existedUser){
        return res.status(400).json("Existing User");
    }

    const userData= await userModel.create({
        FullName,
        UserName,
        email,
        password,
    });

    const findUser=userModel.findById(userData?._id).select("-password -refreshToken");

    console.log(findUser);

    return res.status(200).json({"user":{findUser}});
}

const LoginUser=async(req ,res)=>{
    try {
        const {email,password}=req?.body;
        if(!(email||password)){
            return res.status(404).json("Please Provide email and password");
        }
        const findUser= await userModel.findOne({email});
        console.log("Half")
        if(!findUser){
            return res.status(404).json("User Not Found");
        }

        console.log(findUser);
        const userPassword=await userModel.isPasswordCorrect(password);


        if(!userPassword){
            return res.status(401).json("Invliad Password or email");
        }


        const {accessToken,refreshToken}=await generateAccessAndRefereshTokens(findUser?._id);

        console.log("df")

        return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json( 
                 {accessToken, refreshToken},
                "Access token refreshed"
        )


    } catch (error) {
        return res.status(500).json("Something Went Wring while Login user");
    }
}


const LogoutUser = async(req, res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset: {
                refreshToken: 1 // this removes the field from document
            }
        },
        {
            new: true
        }
    )

    return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json("User logged Out")
}

export {
    CreateUser,
    LoginUser,
    LogoutUser
}