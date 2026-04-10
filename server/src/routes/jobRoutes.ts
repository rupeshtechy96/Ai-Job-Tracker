import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware";
import {
  createJob,
  deleteJob,
  getJobs,
  parseJobDescription,
  updateJob,
  updateJobStatus,
} from "../controllers/jobController";

const router = Router();

router.use(authMiddleware);

router.get("/", getJobs);
router.post("/", createJob);
router.post("/parse-jd", parseJobDescription);
router.put("/:id", updateJob);
router.patch("/:id/status", updateJobStatus);
router.delete("/:id", deleteJob);

export default router;