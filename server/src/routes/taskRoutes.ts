import { Router } from "express";
import { createTask, getTasks, getUserTasks, updateTaskStatus } from "../controllers/taskController";

const router = Router();

// Calls the API logic from controllers file
router.get("/", getTasks);
router.post("/", createTask);
router.get("/user/:userId", getUserTasks);

// Patch is for updating
// To hit this endpoint, you must specify which task to update as well as the status
// e.g http://localhost:8000/tasks/41/status
router.patch("/:taskId/status", updateTaskStatus)

export default router;
