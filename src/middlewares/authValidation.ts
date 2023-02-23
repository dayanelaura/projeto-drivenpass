import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { getUserByEmail } from "../repositories/userRepository.js";
import { Request, Response } from "express";
dotenv.config();

export async function authValidation(req: Request, res: Response, next) {
	const { authorization } = req.headers;

	const token = authorization?.replace("Bearer ", "");

	if (!token) {
		return res.sendStatus(401);
	}

	try {
		jwt.verify(token, process.env.SECRET_JWT, async (error, decoded) => {
			if (error) {
				return res.sendStatus(401);
			}

			const user = await getUserByEmail(decoded.email);
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
