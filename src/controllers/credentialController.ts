import Cryptr from "cryptr";
import { Request, Response } from "express";
import { createCredential, getCredentialsByUserId } from "../repositories/credentialRepository.js";

export async function postCredential(req: Request, res: Response) {
	const credential = res.locals.credential;
	try {
		await createCredential(credential);
		res.sendStatus(201);
	} catch (error) {
		res.sendStatus(500);
	}
}

export async function getCredentials(req: Request, res: Response) {
	const user = res.locals.user;
	//const cryptr = res.locals.cryptr;

	try {
		const credentials = await getCredentialsByUserId(user);
		
		/* let decryptedPasswords = [];
		credentials.filter(value => decryptedPasswords = [...decryptedPasswords, value.password]);
		//const decryptedPasswords  = encryptedPasswords.forEach(password => cryptr.decrypt(password));

		console.log(decryptedPasswords);  */
		res.status(200).send(credentials);
	} catch (error) {
		res.sendStatus(500);
	}
}