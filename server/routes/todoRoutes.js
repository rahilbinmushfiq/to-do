import express from "express";
import {
  addTodo,
  deleteTodo,
  getTodo,
  getTodos,
  updateTodo,
} from "../controllers/todoControllers.js";

const router = express.Router();

router.get("/", getTodos);

router.get("/:id", getTodo);

router.post("/", addTodo);

router.put("/:id", updateTodo);

router.delete("/:id", deleteTodo);

export default router;
