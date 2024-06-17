import mongoose from "mongoose";

const UrlSchema=mongoose.Schema({
    ShortUrl:{
        type:String,
        require:true,
    },
    redirect_url:{
        type:String,
        require:true,
    },
    userID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    vistHistory:[],
},{timestamps:true})

const UrlModel=mongoose.model("urlcollection",UrlSchema);

export default UrlModel;