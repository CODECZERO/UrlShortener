import { Router } from "express";
import {AddShortUrl,remvoeUrl,LogAndVist,analytics} from "../Controller/url.controller.js";
import UserVerify from "../Middleware/userVerify.middleware.js";

const router=Router();

router.route("/AddUrl").post(AddShortUrl);
router.route("/analytics/:ShortUrl").get(UserVerify,analytics);
router.route("/:ShortUrl").get(UserVerify,LogAndVist).delete(UserVerify,remvoeUrl);

export default router;