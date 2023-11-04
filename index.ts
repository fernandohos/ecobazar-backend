import express from "express";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const PORT = process.env.PORT;

app.listen(() => {
  console.log(`[server] Server is running at: http://localhost:${PORT}`);
});
