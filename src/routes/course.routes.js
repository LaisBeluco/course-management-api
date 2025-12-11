import { Router } from "express";
import CourseController from "../controllers/CourseController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = Router();

router.use(authMiddleware);

router.get("/", CourseController.list);
router.get("/:id", CourseController.show);
router.post("/", CourseController.create);
router.put("/:id", CourseController.update);
router.delete("/:id", CourseController.delete);

export default router;