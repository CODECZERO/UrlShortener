import { Router } from "express";
import { LoginUser,CreateUser,LogoutUser} from "../Controller/user.controller.js";
import UserVerify from "../Middleware/userVerify.middleware.js"
const router=Router();

router.route("/Singup").post(CreateUser);
router.route("/Login").post(LoginUser);
router.route("/logout").delete(UserVerify,LogoutUser);

export default router;