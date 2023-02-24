import { NextFunction, Request, Response } from "express";
import { User } from "../protocols/user.js";
import { getUserByEmail } from "../repositories/userRepository.js";
import { userSchema } from "../schemas/userSchema.js";

export async function signUpValidation(req: Request, res: Response, next: NextFunction) {
	const user = req.body as User;

	const { error } = userSchema.validate(user, { abortEarly: false });
	if (error) {
		const errors = error.details.map((err) => err.message);
		return res.status(422).send(errors);
	}

	const userExists = await getUserByEmail(user.email);
	if (userExists) {
		return res.status(409).send("E-mail já cadastrado");
	}

	res.locals.user = user;
	next();
}
