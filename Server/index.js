import app from "./app.js";//express file
import { config } from "dotenv";
config();// initialize dotenv to get Env variable
import dbConnect from "./DB/DbConnect.js";//connecting the mongodb

dbConnect().then((res)=>app.listen(process.env.PORT||4000,()=>{
    console.log(`app Running on ${process.env.PORT||4000}`)
})).catch((error)=>{throw `Unable to run app or unable to Connect Database ${error}`})