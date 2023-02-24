import prisma from "../database/database.js";
import { Credential } from "../protocols/credential.js";

export async function getCredentialsByUserId(userId: number){
    return prisma.credential.findMany({
        where: {
                userId: userId
        }
});
}

export function createCredential(credential: Credential) {
    const { user, title, url, username, password } = credential;
        return prisma.credential.create({
                data: {
                    userId: user,
                    title,
                    url,
                    username,
                    password,
                }
        });
}