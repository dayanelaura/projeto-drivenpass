import Cryptr from "cryptr";
import { NextFunction, Request, Response } from "express";
import { credentialSchema } from "../schemas/credentialSchema.js";
import { getUserById } from "../repositories/userRepository.js";
import { getCredentialsByUserId } from "../repositories/credentialRepository.js";
import { Credential } from "../protocols/credential.js";

export async function credentialValidation(req: Request, res: Response, next: NextFunction) {
	const credential = req.body;
	const { user, password, title } = credential as Credential;

	const { error } = credentialSchema.validate(credential, { abortEarly: false });
   	if(error){
		const errors = error.details;
		const errorsTXT = errors.map(detail => detail.message);
		return res.status(422).send(errorsTXT);
	}
  
	const userById = await getUserById(user);
	if (!userById) {
		return res.status(401);
	}

    const allCredentialsById = await getCredentialsByUserId(user);
	const isThereTitle = allCredentialsById.filter(value => value.title === title);
    if (isThereTitle.length>0) {
		return res.sendStatus(401);
	}
	
    const cryptr = new Cryptr(password);
    const credentialObject = { ...credential, password: cryptr.encrypt(credential.password) };
	res.locals.credential = credentialObject;
	res.locals.cryptr = cryptr;

	next();
}
