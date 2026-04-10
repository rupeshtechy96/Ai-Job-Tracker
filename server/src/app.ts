import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes";
import jobRoutes from "./routes/jobRoutes";
import { errorMiddleware } from "./middleware/errorMiddleware";

const app = express();

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use(express.json({ limit: "1mb" }));

app.get("/", (_req, res) => {
  res.json({
    success: true,
    message: "AI Job Tracker backend is running",
  });
});

app.get("/api/health", (_req, res) => {
  res.json({
    success: true,
    message: "Server is healthy",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);

app.use(errorMiddleware);

export default app;