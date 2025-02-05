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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const passport_1 = __importDefault(require("passport"));
const passport_google_oauth20_1 = require("passport-google-oauth20");
const db_1 = require("../config/db");
passport_1.default.use(new passport_google_oauth20_1.Strategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback',
}, (accessToken, refreshToken, profile, done) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const { id, displayName, emails, photos } = profile;
        const email = emails && ((_a = emails[0]) === null || _a === void 0 ? void 0 : _a.value);
        const photo = photos && ((_b = photos[0]) === null || _b === void 0 ? void 0 : _b.value);
        if (!email) {
            return done(new Error('No email found in the Google profile'));
        }
        // Find or create the user in the database
        let user = yield db_1.db.user.findUnique({ where: { email: email } });
        if (!user) {
            user = yield db_1.db.user.create({
                data: {
                    firstName: displayName,
                    email: email,
                    password: 'googleUser'
                },
            });
        }
        // Generate a JWT token
        const token = jsonwebtoken_1.default.sign({
            id: user.id,
            email: user.email,
            displayName: user.firstName
        }, process.env.JWT_SECRET, { expiresIn: '1h' });
        // Pass the token to the client
        return done(null, token);
    }
    catch (error) {
        return done(error);
    }
})));
exports.default = passport_1.default;
