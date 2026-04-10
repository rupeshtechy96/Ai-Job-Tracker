import dotenv from "dotenv";

dotenv.config();

function getEnv(name: string, fallback?: string): string {
  const value = process.env[name] ?? fallback;

  if (value === undefined) {
    throw new Error(`Missing environment variable: ${name}`);
  }

  return value;
}

export const env = {
  PORT: Number(getEnv("PORT", "5000")),
  CLIENT_URL: getEnv("CLIENT_URL", "http://localhost:5173"),
  JWT_SECRET: getEnv("JWT_SECRET", "super_secret_key"),
  OPENAI_API_KEY: getEnv("OPENAI_API_KEY", ""),
  USE_OPENAI: getEnv("USE_OPENAI", "false") === "true",

  MONGO_URI: getEnv(
    "MONGO_URI",
    "mongodb+srv://patelji94:Patel2005@ai-job.3cqiwnv.mongodb.net/ai_job_tracker?retryWrites=true&w=majority"
  )
};