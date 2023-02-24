import bcrypt from "bcrypt";
import { NextFunction, Request, Response } from "express";
import { getUserByEmail } from "../repositories/userRepository.js";
import { userSchema } from "../schemas/userSchema.js";

export async function signInValidation(req: Request, res: Response, next: NextFunction) {
	const reqUser = req.body;
	const { email, password } = reqUser;

	const { error } = userSchema.validate(reqUser, { abortEarly: false });
   	if(error){
		const errors = error.details;
		const errorsTXT = errors.map(detail => detail.message);
		return res.status(422).send(errorsTXT);
	}
  
	const user = await getUserByEmail(email);
	if (!user) {
		return res.status(401).send("Email ou senha inválidos");
	}

	const isPasswordCorrect = bcrypt.compareSync(password, user.password);
	if (!isPasswordCorrect) {
		return res.status(401).send("Email ou senha inválidos");
	}

	delete user.password;
	res.locals.user = user;
	next();
}
