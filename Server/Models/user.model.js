import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    FullName: {
        type: String,
        require: [true, "Full Name is require"],
        trim: true
    },
    UserName: {
        type: String,
        require: [true, "User Name is require"],
        unique: true
    },
    email: {
        type: String,
        lowercase: true,
        require: [true, "email is require"],
        unique: true

    },
    password: {
        type: String,
        require: [true, "password is require"]
    },
    refreshToken: {
        type: String,
    }
}, { timestamps: true })


userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    try {
        await bcrypt.hash(this.password, process.env.SECRET_KEY);
        next();
    } catch (error) {
        next(error);
    }
});

userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
}

userSchema.methods.genAccesToken = async function(){
    return await jwt.sign({
        _id: this._id,
        email: this.email,
        userName: this.userName,
        fullName: this.fullName
    },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_TIME
        })
}

userSchema.methods.genRefershToken = async function () {
    return await jwt.sign({
        _id: this._id,
    },
        process.env.REFERSH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFERSH_TOKEN_TIME
        })
}


const userModel = mongoose.model('user', userSchema);

export default userModel;
