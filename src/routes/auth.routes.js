"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_controller_1 = require("../controllers/auth.controller");
const express_1 = __importDefault(require("express"));
const authController = new auth_controller_1.AuthController();
const authRouter = express_1.default.Router();
authRouter.post("/", authController.login);
// authRouter.get('/login/success', (res: Response, req:Request)=>{const user = req.user; res.status(200).json({user: user})})
// authRouter.get('/login/failed', authController.googleLoginFail)
// authRouter.get('/logout', authController.logout)
exports.default = authRouter;
