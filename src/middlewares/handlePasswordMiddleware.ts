import Cryptr from "cryptr";
import { Credential } from "../protocols/credential";

export function handlePassword(password: string, credential: Credential){
    const cryptr = new Cryptr(password);
    const credentialObject = { ...credential, password: cryptr.encrypt(credential.password) };
	
    const decryptedPassword = cryptr.decrypt(credential.password)
	return credentialObject;
}