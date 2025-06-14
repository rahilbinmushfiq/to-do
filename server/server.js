import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import todoRouter from "./routes/todoRoutes.js";

connectDB();

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(express.json());

app.use("/api/todos", todoRouter);

app.listen(process.env.BACKEND_PORT, () =>
  console.log(`Server running at port ${process.env.BACKEND_PORT}`)
);
