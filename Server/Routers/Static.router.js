import { Router } from "express";
import { Homepage } from "../Controller/Static.controller.js";

const router=Router();

router.route("/").get(Homepage);

export default router;