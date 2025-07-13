import { Router } from "express";
import { createProject, getProjects } from "../controllers/projectControllers";

const router = Router();

// Calls the API logic from controllers file
router.get("/", getProjects);
router.post("/", createProject);

export default router;
