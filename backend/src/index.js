import express from "express";
import "dotenv/config";
import fs from "fs";
import path from "path";
import { clerkMiddleware } from "@clerk/express";
import cors from "cors";
import job from "./lib/cron.js";
import { connectDB } from "./lib/db.js";
import clerkWebhooks from "./webhook/clerk.webhook.js";
import authRoutes from "./routes/auth.routes.js";

const app = express();
const PORT = process.env.PORT || 3000;
const FRONTEND_URL = process.env.FRONTEND_URL;

const publicDir = path.join(process.cwd(), "public");

// Webhook sabse pehle, express.json() se upar.
// express.raw already clerk.webhook.js ke router me laga hai.
app.use("/api/webhooks/clerk", clerkWebhooks);

app.use(express.json());
app.use(cors({ origin: FRONTEND_URL, credentials: true }));
app.use(clerkMiddleware());

app.get("/health", (req, res) => {
  res.status(200).json({ ok: true });
});


app.use("/api/auth", authRoutes)

if (fs.existsSync(publicDir)) {
  app.use(express.static(publicDir));

  app.get("/{*any}", (req, res, next) => {
    res.sendFile(path.join(publicDir, "index.html"), (err) => {
      if (err) next(err);
    });
  });
}

app.listen(PORT, () => {
  connectDB();
  console.log("server is up and running on PORT:", PORT);

  if (process.env.NODE_ENV === "production") job.start();
});