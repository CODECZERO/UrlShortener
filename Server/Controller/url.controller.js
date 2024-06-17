import { nanoid } from "nanoid";
import UrlModel  from "../Models/url.model.js";
import { addData, removeData } from "../Middleware/redis.services.js";
import mongoose from "mongoose";

await redisClient.connect();

const AddShortUrl = async (req, res) => {
    try {
        const { Url } = req?.body;
        if (!Url) {
            return res.status(400).json("URl not Provided");
        }
        const UrlGen = nanoid(9);
        const SaveUrl = await UrlModel.create({
            ShortUrl: UrlGen,
            redirect_url: Url
        })

        if(!SaveUrl){
            return res.status(500).json("MongoDb error");
        }
        
        return res.status(200).json({"Url Data":SaveUrl});
    }
     catch (error) {
        return res.status(500).json("something Went wring while making url");
    }
}

const remvoeUrl=async(req,res)=>{
   try {
     const {userid,ShortUrl}=req?.user;
     const DatabaseCheck= await UrlModel.findOne({ShortUrl,userID:userid});
     if(!DatabaseCheck){
         return res.status(404).json("Not Found");
     }
     await UrlModel.deleteOne({_id:url?._id});
     return res.status(200).json("Url Removed Successfuly");
   } catch (error) {
        return res.status(500).json("something wnet Wrong while Removing url");
   }


}

const LogAndVist=async(req,res)=>{
    try {
        const{ShortUrl}=req.params.ShortId;
        const entry=await UrlModel.findOneAndUpdate({
            ShortUrl
        },{
            $push:{
                vistHistory:Date.now(),
            }
        })
        res.redirect(entry.redirect_url);
    
    } catch (error) {
        return res.status(500).json("something wnet Wrong while Redirecting");
    }   
}

const analytics=async(req,res)=>{
    try {
        const{ShortUrl}=req.params.ShortId;
        const findUrl= await UrlModel.findOne({ShortUrl});

       if(!findUrl){
        return res.status(404).json("Url not found");
       }
       return res.status(200).json({
        TotalClick:findUrl.vistHistory.length,
        Analytics:findUrl.vistHistory,
       });

    } catch (error) {
        return res.status(500).json("something wnet Wrong while showing Analytics");
    }
}

export {
    AddShortUrl,
    remvoeUrl,
    LogAndVist,
    analytics
}