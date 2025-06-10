let todos = [
  { id: 0, task: "task 1" },
  { id: 1, task: "task 2" },
  { id: 2, task: "task 3" },
];

export const getTodos = (req, res) => {
  res.status(200).json(todos);
};

export const getTodo = (req, res) => {
  const todoId = req.params.id;

  if (isNaN(todoId))
    return res
      .status(400)
      .json({ message: `Bad request: ${todoId} is not a number.` });

  const todo = todos.find((todo) => todo.id == todoId);

  if (!todo)
    return res
      .status(404)
      .json({ message: `Not found: todo with ${todoId} does not exist.` });

  res.status(200).json(todo);
};

export const addTodo = (req, res) => {
  const task = req.body;

  if (!task)
    return res.status(400).json({ message: "Bad request: nothing submitted." });

  if (typeof task !== "string")
    return res
      .status(400)
      .json({ message: "Bad request: wrong format submitted." });

  todos.push({ id: todos.length, task });

  res.status(201);
};

export const updateTodo = (req, res) => {
  const targetedTodoId = req.params.id;
  const updatedTask = req.body;

  if (!isNaN(targetedTodoId))
    return res
      .status(400)
      .json({ message: `Bad request: ${targetedTodoId} is not a number.` });

  if (!updatedTask)
    return res.status(400).json({ message: "Bad request: nothing submitted." });

  if (typeof updatedTask !== "string")
    return res
      .status(400)
      .json({ message: "Bad request: wrong format submitted." });

  todos = todos.map((prevTodo) => ({
    ...prevTodo,
    task: prevTodo.id === targetedTodoId ? updatedTask : prevTodo.task,
  }));
};

export const deleteTodo = (req, res) => {
  const todoId = req.params.id;

  if (!isNaN(todoId))
    return res
      .status(400)
      .json({ message: `Bad request: ${todoId} is not a number.` });

  todos = todos.filter((todo) => todo.id !== todoId);

  res.status(201);
};
