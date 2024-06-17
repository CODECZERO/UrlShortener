import app from "./app";//express file
import { config } from "dotenv";
config();// initialize dotenv to get Env variable
import dbConnect from "./DB/DbConnect";//connecting the mongodb

dbConnect().then((res)=>app.listen(process.env.APP_PORT||4000,()=>{
    console.log(`app Running on ${process.env.APP_PORT||4000}`)
})).catch((error)=>{throw `Unable to run app or unable to Connect Database ${error}`})