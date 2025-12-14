import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js";
import authRoutes from './routes/authRoutes.js'
import bookRoutes from './routes/bookRoutes.js'

const app = express();

dotenv.config();
//DataBase Connection
connectDB();

app.use(cors());
app.use(express.json());


//Base Route URL
app.get("/", (req, res) => {
  res.send("server is on");
});

//auth Base URL
app.use('/api/auth', authRoutes);

//Books Base URL
app.use('/api/book', bookRoutes);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
