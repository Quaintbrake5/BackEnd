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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthServicesImpl = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const customError_utils_1 = require("../../utils/customError.utils");
const db_1 = require("../../config/db");
const password_utils_1 = require("../../utils/password.utils");
dotenv_1.default.config();
class AuthServicesImpl {
    login(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield db_1.db.user.findFirst({
                where: {
                    email: data.email,
                },
            });
            if (!user) {
                throw new customError_utils_1.CustomError(404, "User not found");
            }
            const isPasswordValid = yield (0, password_utils_1.comparePassword)(data.password, user.password);
            if (!isPasswordValid) {
                throw new customError_utils_1.CustomError(401, "Invalid password or email");
            }
            const fullName = user.firstName + " " + user.lastName;
            const accessToken = this.generateAccessToken(user.id, fullName, user.role);
            const refreshToken = this.generateRefreshToken(user.id, fullName, user.role);
            return { accessToken, refreshToken };
        });
    }
    generateAccessToken(userId, name, role) {
        return jsonwebtoken_1.default.sign([userId, name, role], process.env.JWT_SECRET || "", {
            expiresIn: process.env.JWT_ACCESS_EXPIRES_IN,
        });
    }
    generateRefreshToken(userId, name, role) {
        return jsonwebtoken_1.default.sign([userId, name, role], process.env.JWT_SECRET || "", {
            expiresIn: process.env.JWT_ACCESS_EXPIRES_IN,
        });
    }
}
exports.AuthServicesImpl = AuthServicesImpl;
