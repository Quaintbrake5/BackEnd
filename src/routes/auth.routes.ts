import { AuthController } from "../controllers/auth.controller";
import express from "express"
import passport from "passport";

const authController = new AuthController();
const authRouter = express.Router();

authRouter.post("/", authController.login)








// authRouter.get('/login/success', (res: Response, req:Request)=>{const user = req.user; res.status(200).json({user: user})})
// authRouter.get('/login/failed', authController.googleLoginFail)
// authRouter.get('/logout', authController.logout)





export default authRouter;