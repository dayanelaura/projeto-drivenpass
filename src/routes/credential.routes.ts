import { Router } from "express";
import { getCredentials, postCredential } from "../controllers/credentialController.js";
import { authValidation } from "../middlewares/authValidation.js";
import { credentialValidation } from "../middlewares/credentialValidation.js";

const credentialRouter = Router();

credentialRouter.post("/credential", authValidation, credentialValidation, postCredential);
credentialRouter.get("/credential", authValidation, getCredentials);

export default credentialRouter;