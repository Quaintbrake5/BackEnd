"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const user_service_impl_1 = require("../service/implementation/user.service.impl");
class UserController {
    constructor() {
        this.createUser = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const userData = req.body;
                const newUser = yield this.userService.createUser(userData);
                res.status(201).json(newUser);
            }
            catch (error) {
                next(error);
            }
        });
        this.userService = new user_service_impl_1.UserServiceImpl();
    }
}
exports.UserController = UserController;
