import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { router as authRouter } from "./routes/auth-router";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3030;

app.use(cors());
app.use(express.json());
app.use(authRouter);

app.get("/", (req, res) => {
  res.send("hello world!");
});

app.listen(PORT, () => {
  console.log(`[server] Server is running at: http://localhost:${PORT}`);
});
