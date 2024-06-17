import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import Staticrouter from "./Routers/Static.router.js";

const app=express();


app.use("/",Staticrouter);
app.use(cors());
app.use(express.json({limit: "16kb"}));
app.use(express.urlencoded({extended: true, limit: "16kb"}));
app.use(cookieParser());


//Import Routers

import UserRouter from "./Routers/user.router.js";
import UrlRouter from "./Routers/url.router.js";

//Route Declaration
app.use("/api/v1/User",UserRouter);
app.use("/api/v1/url",UrlRouter);

export default app;
