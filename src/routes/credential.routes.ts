import { Router } from "express";
import { postCredential } from "../controllers/credentialController.js";
import { authValidation } from "../middlewares/authValidation.js";
import { credentialValidation } from "../middlewares/credentialValidation.js";

const credentialRouter = Router();

credentialRouter.post("/credential", authValidation, credentialValidation, postCredential);
credentialRouter.get("/credential", authValidation, () => console.log('oi')/* , getCredentials */);

export default credentialRouter;