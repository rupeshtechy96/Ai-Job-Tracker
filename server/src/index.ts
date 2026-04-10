import app from "./app";
import { env } from "./config/env";
import { connectDB } from "./config/db";

async function startServer() {
  try {
    await connectDB();

    app.listen(env.PORT, () => {
      console.log(`🚀 Server running on http://localhost:${env.PORT}`);
    });
  } catch (error) {
    console.error("Server failed to start:", error);
  }
}

startServer();