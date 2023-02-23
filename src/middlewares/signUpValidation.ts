import { Request, Response } from "express";
import { getUserByEmail } from "../repositories/userRepository.js";
import { userSchema } from "../schemas/userSchema.js";

export async function signUpValidation(req: Request, res: Response, next) {
	const user = req.body;

	const { error } = userSchema.validate(user, { abortEarly: false });

	if (error) {
		const errors = error.details.map((err) => err.message);
		return res.status(422).send(errors);
	}

	const userExists = await getUserByEmail(user.email);
	if (userExists) {
		return res.status(409).send("E-mail já cadastrado");
	}

	delete user.confirmPassword;
	res.locals.user = user;

	next();
}
