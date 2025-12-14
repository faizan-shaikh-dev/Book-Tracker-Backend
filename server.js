import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js";

const app = express();

dotenv.config();
//DataBase Connection
connectDB();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("server is on");
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
