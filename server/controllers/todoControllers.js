let todos = [
  { id: 0, task: "Buy apples for parents", isDone: true },
  { id: 1, task: "Fix the bug in shop page", isDone: false },
  { id: 2, task: "Get the keys from uncle", isDone: false },
];

export const getTodos = (req, res) => {
  res.status(200).json(todos);
};

export const getTodo = (req, res) => {
  const todoId = Number(req.params.id);

  if (isNaN(todoId))
    return res
      .status(400)
      .json({ message: `Bad request: ${req.params.id} is not a number.` });

  const todo = todos.find((todo) => todo.id === todoId);

  if (!todo)
    return res
      .status(404)
      .json({ message: `Not found: todo with ${todoId} does not exist.` });

  res.status(200).json(todo);
};

export const addTodo = (req, res) => {
  const { task } = req.body;

  if (!task)
    return res.status(400).json({ message: "Bad request: nothing submitted." });

  if (typeof task !== "string")
    return res
      .status(400)
      .json({ message: "Bad request: wrong format submitted." });

  const newTodo = {
    id: todos.length > 0 ? Math.max(...todos.map((t) => t.id)) + 1 : 0,
    task,
    isDone: false,
  };

  todos.push(newTodo);

  res.status(201).json({ message: "Todo added successfully" });
};

export const updateTodo = (req, res) => {
  const targetedTodoId = Number(req.params.id);
  const updatedTodo = req.body;

  if (isNaN(targetedTodoId))
    return res
      .status(400)
      .json({ message: `Bad request: ${req.params.id} is not a number.` });

  if (!updatedTodo)
    return res.status(400).json({ message: "Bad request: nothing submitted." });

  let todoExists = false;
  todos = todos.map((prevTodo) => {
    if (prevTodo.id === targetedTodoId) {
      todoExists = true;
      return {
        ...prevTodo,
        task: updatedTodo.task !== undefined ? updatedTodo.task : prevTodo.task,
        isDone:
          updatedTodo.isDone !== undefined
            ? updatedTodo.isDone
            : prevTodo.isDone,
      };
    }
    return prevTodo;
  });

  if (!todoExists) {
    return res.status(404).json({
      message: `Not found: todo with ${targetedTodoId} does not exist.`,
    });
  }

  return res
    .status(200)
    .json({ message: `Todo with ID ${targetedTodoId} updated successfully.` });
};

export const deleteTodo = (req, res) => {
  const todoId = Number(req.params.id);

  if (isNaN(todoId))
    return res
      .status(400)
      .json({ message: `Bad request: ${req.params.id} is not a number.` });

  const initialLength = todos.length;
  todos = todos.filter((todo) => todo.id !== todoId);

  if (todos.length === initialLength) {
    return res
      .status(404)
      .json({ message: `Not found: todo with ${todoId} does not exist.` });
  }

  return res
    .status(200)
    .json({ message: `Todo with ID ${todoId} deleted successfully.` });
};
