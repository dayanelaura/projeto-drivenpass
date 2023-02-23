import prisma from "../database/database.js";
import { User } from "../protocols/user.js";

export function createUser(user: User) {
    const { email, password } = user;
        return prisma.user.create({
                data: {
                        email,
                        password
                }
        });
}

export function getUserByEmail(email: string){
    return prisma.user.findUnique({
            where: {
                    email: email
            }
    });
}