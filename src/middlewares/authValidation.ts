import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { getUserById } from "../repositories/userRepository.js";
import { NextFunction, Request, Response } from "express";
import { Decoded } from "../protocols/user.js";

dotenv.config();

export async function authValidation(req: Request, res: Response, next: NextFunction) {
	const { authorization } = req.headers;

	const token = authorization?.replace("Bearer ", "");
	if (!token) {
		return res.sendStatus(401);
	}

	try {
		jwt.verify(token, process.env.SECRET_JWT, async (error, decoded: Decoded) => {
			if (error) {
				return res.sendStatus(401);
			}

			const { id } = decoded as Decoded;
			const user = await getUserById(Number(decoded.id));
			if (!user) {
				return res.sendStatus(404);
			}
			
			delete user.password;
			res.locals.user = user;
			return next();
		});
	} catch (error) {
		return res.status(500).send(error.message);
	}
}
