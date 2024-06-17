import { Router } from "express";

const UserRouter=Router();

UserRouter.route("/user").get().post().patch().put().delete()