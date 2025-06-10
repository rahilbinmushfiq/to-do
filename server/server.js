import express from "express";
import todoRouter from "./routes/todoRoutes.js";

const app = express();

app.use("/api/todo", todoRouter);

app.listen(process.env.BACKEND_PORT, () =>
  console.log(`Server running at port ${process.env.BACKEND_PORT}`)
);
