import TodoWithCheckbox from "./TodoWithCheckbox";
import EditTodo from "./EditTodo";
import DeleteTodo from "./DeleteTodo";

export default function TodoList({ todos }) {
  return (
    <section className="w-full max-w-lg space-y-2.5">
      {todos?.map((todo) => {
        return (
          <div
            key={`todo-task-${todo._id}`}
            className="flex items-center justify-between"
          >
            <TodoWithCheckbox todo={todo} />
            <div className="flex items-center gap-2">
              <EditTodo todo={todo} />
              <DeleteTodo todo={todo} />
            </div>
          </div>
        );
      })}
    </section>
  );
}
