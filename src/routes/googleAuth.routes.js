"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
const googleRouter = express_1.default.Router();
googleRouter.get('/google', passport_1.default.authenticate('google', { scope: ['profile', 'email'] }));
// Callback route
googleRouter.get('/google/callback', passport_1.default.authenticate('google', { session: false }), // No session
(req, res) => {
    const user = req.user; // The user object passed by the Google strategy
    res.json({ message: 'Login successful', user });
});
exports.default = googleRouter;
