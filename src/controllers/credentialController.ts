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

	try {
		const credentials = await getCredentialsByUserId(1);
		let decryptedPasswords = [];
		credentials.filter(value => decryptedPasswords = [...decryptedPasswords, value.password]);

		res.status(200).send(credentials);
	} catch (error) {
		res.sendStatus(500);
	}
}