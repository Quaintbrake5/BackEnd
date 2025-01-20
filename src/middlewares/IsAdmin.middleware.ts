import { NextFunction } from "express";
import { CustomRequest } from "./auth.middleware";
import { CustomError } from "../utils/customError.utils";
import { StatusCodes } from "http-status-codes";
import { Role } from "@prisma/client";
import { db } from "../config/db";






const IsAdmin = async (
    req: CustomRequest,
    res: Response,
    next: NextFunction
): Promise<void>=>{
    try{
        const user = await db.user.findUnique({
            where: {
                id: Number(req.userAuth)
            }
        })
        if (!user){
            throw new CustomError(StatusCodes.NOT_FOUND, "User not found")
        }
        if(user.role  === Role.ADMIN){
            next();
        }else{
            throw new CustomError(StatusCodes.NOT_FOUND, "Access Denied")
        }
    } catch (error){
        next(error);
    }
}

export default IsAdmin;