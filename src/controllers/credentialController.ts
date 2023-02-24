import { Request, Response } from "express";
import { createCredential } from "../repositories/credentialRepository.js";

export async function postCredential(req: Request, res: Response) {
	const credential = res.locals.credential;
	try {
		await createCredential(credential);
		res.sendStatus(201);
	} catch (error) {
		res.sendStatus(500);
	}
}