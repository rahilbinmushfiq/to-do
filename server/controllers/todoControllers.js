import Todo from "../models/Todo.js";

export const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find().sort({ createdAt: 1 });
    res.status(200).json(todos);
  } catch (error) {
    console.error("Error fetching todos:", error.message);
    res
      .status(500)
      .json({ message: "Internal server error while fetching todos" });
  }
};

export const getTodo = async (req, res) => {
  try {
    const id = req.params.id;

    const todo = await Todo.findById(id);

    if (!todo) return res.status(404).json({ message: "Todo not found" });

    res.status(200).json(todo);
  } catch (error) {
    console.error("Error fetching todo:", error.message);
    res
      .status(500)
      .json({ message: "Internal server error while fetching todo" });
  }
};

export const addTodo = async (req, res) => {
  try {
    const { task } = req.body;

    if (!task)
      return res
        .status(400)
        .json({ message: "Bad request: nothing submitted." });

    if (typeof task !== "string")
      return res
        .status(400)
        .json({ message: "Bad request: wrong format submitted." });

    const newTodo = await Todo.create({ task });
    await newTodo.save();

    res.status(201).json({ message: "Todo added successfully", newTodo });
  } catch (error) {
    console.error("Error adding todo:", error.message);
    res
      .status(500)
      .json({ message: "Internal server error while adding todo" });
  }
};

export const updateTodo = async (req, res) => {
  try {
    const id = req.params.id;
    const updates = req.body;

    if (!updates)
      return res
        .status(400)
        .json({ message: "Bad request: nothing submitted." });

    const todo = await Todo.findById(id);

    if (!todo) return res.status(404).json({ message: "Todo not found" });

    if (typeof updates.task === "string") todo.task = updates.task;
    if (typeof updates.isDone === "boolean") todo.isDone = updates.isDone;

    await todo.save();

    return res
      .status(200)
      .json({ message: "Todo updated successfully.", todo });
  } catch (error) {
    console.error("Error updating todo:", error.message);
    res
      .status(500)
      .json({ message: "Internal server error while updating todo" });
  }
};

export const deleteTodo = async (req, res) => {
  try {
    const id = req.params.id;

    const deletedTodo = await Todo.findByIdAndDelete(id);

    if (!deletedTodo)
      return res.status(404).json({ message: "Todo not found" });

    return res.status(200).json({ message: "Todo deleted successfully." });
  } catch (error) {
    console.error("Error deleting todo:", error.message);
    res
      .status(500)
      .json({ message: "Internal server error while deleting todo" });
  }
};
