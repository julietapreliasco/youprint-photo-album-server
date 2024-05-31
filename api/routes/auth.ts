import express from "express";
import { registerAdmin, loginAdmin } from "../controllers/auth";
import validateRequest from "../middleware/validations";
import { authSchema } from "../validations/authSchema";

const router = express.Router();

router.post("/register", validateRequest(authSchema), registerAdmin);
router.post("/login", validateRequest(authSchema), loginAdmin);

export default router;
