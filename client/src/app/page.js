import AddTodo from "@/components/home/AddTodo";
import TodoList from "@/components/home/TodoList";

export default async function Home() {
  let todos;

  try {
    const response = await fetch("http://localhost:5000/api/todos/", {
      cache: "no-store",
    });
    todos = await response.json();
  } catch (error) {
    console.error(error.message);
  }

  return (
    <main className="mx-5 flex min-h-dvh flex-col items-center justify-center font-[family-name:var(--font-geist-mono)] sm:mx-8 lg:mx-12 xl:mx-auto xl:w-[1200px]">
      <h1 className="text-3xl font-semibold">To-Do App</h1>
      <AddTodo />
      <TodoList todos={todos} />
    </main>
  );
}
