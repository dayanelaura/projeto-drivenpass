import { Router } from "express";
import userRoutes from "./user.routes.js";
import credentialRoutes from "./credential.routes.js";

const router = Router();

router.use(userRoutes);
router.use(credentialRoutes);

export default router;