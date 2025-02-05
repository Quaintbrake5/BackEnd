"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controllers/user.controller");
const userController = new user_controller_1.UserController();
const userRouter = express_1.default.Router();
userRouter.post("/", userController.createUser);
// userRouter.get("/", userController.getAllUsers);
// userRouter.get("/:id", userController.getUserById);
// userRouter.put("/:id", userController.updateUser)
// userRouter.delete("/:id", userController.deleteUser)
exports.default = userRouter;
