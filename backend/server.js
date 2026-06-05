import "dotenv/config";

import express from "express";
import cors from "cors";

import { connectDB } from "./config/db.js";
import authRoutes from "./routes/auth.js";
import {
  notFound,
  errorHandler,
} from "./middleware/errorHandler.js";

console.log("SERVER STARTING");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
  });
});

app.use("/api/auth", authRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 8000;

const startServer = async () => {
  try {
    console.log("CONNECTING DB");

    await connectDB();

    console.log("DB CONNECTED");

    app.listen(PORT, () => {
      console.log(
        `Server running on http://localhost:${PORT}`
      );
    });
  } catch (err) {
    console.error("SERVER ERROR:", err);
  }
};

startServer();