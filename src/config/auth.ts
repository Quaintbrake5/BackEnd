import { PrismaClient } from "@prisma/client";
import passport from "../middlewares/Passport";

const prisma = new PrismaClient();
passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID
        }
    )
)