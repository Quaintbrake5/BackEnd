import { User } from "@prisma/client";
import { CreateUserDTO } from "../../dtos/createUser.dto";
import { UserService } from "../user-service";
import { CustomError } from "../../exceptions/customError.error";
import { db } from "../../config/db";


export class UserServiceImpl implements UserService{
    async createUser(data: CreateUserDTO): Promise<User> {
        const isUserExist = await db.user.findFirst({
            where: {
                email: data.email,
            },
        });

        if(isUserExist){
            throw new CustomError(409, "Oops email already taken");
        }

        const user = await db.user.create({
            data: {
                email: data.email,
                password: data.password,
                firstName: data.firstName,
                lastName: data.lastName,
                role: data.role,
            },
        })
        return user;
    }

    async getUserById(id: number): Promise<User | null> {
        return await db.user.findUnique({
            where: { id },
        })
    }

    async getAllUsers(): Promise<User[]> {
        return await db.user.findMany();
    }

    async updateUser(id: number, data: Partial<CreateUserDTO>): Promise<User> {
        const user = await db.user.update({
            where: { id },
            data,
        });
        return user;
    }

    async deleteUser(id: number): Promise<void> {
        await db.user.delete({
            where: { id },
        });
    }
}