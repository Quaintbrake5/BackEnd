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
exports.UserServiceImpl = void 0;
const customError_error_1 = require("../../exceptions/customError.error");
const db_1 = require("../../config/db");
class UserServiceImpl {
    createUser(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const isUserExist = yield db_1.db.user.findFirst({
                where: {
                    email: data.email,
                },
            });
            if (isUserExist) {
                throw new customError_error_1.CustomError(409, "Oops email already taken");
            }
            const user = yield db_1.db.user.create({
                data: {
                    email: data.email,
                    password: data.password,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    role: data.role,
                },
            });
            return user;
        });
    }
    getUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield db_1.db.user.findUnique({
                where: { id },
            });
        });
    }
    getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield db_1.db.user.findMany();
        });
    }
    updateUser(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield db_1.db.user.update({
                where: { id },
                data,
            });
            return user;
        });
    }
    deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield db_1.db.user.delete({
                where: { id },
            });
        });
    }
}
exports.UserServiceImpl = UserServiceImpl;
