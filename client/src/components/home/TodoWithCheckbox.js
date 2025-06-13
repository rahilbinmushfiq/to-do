"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { CircleCheckIcon, CircleXIcon } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export default function TodoWithCheckbox({ todo }) {
  const router = useRouter();

  const handleTaskCompletion = async () => {
    const wasPrevTaskDone = todo.isDone;
    try {
      const response = await fetch(
        `http://localhost:5000/api/todos/${todo.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...todo,
            isDone: !wasPrevTaskDone,
          }),
        },
      );

      if (response.ok) {
        toast(
          <div className="flex items-center gap-2.5">
            <CircleCheckIcon className="size-5.5 text-green-600" />
            <p>Task marked as {wasPrevTaskDone ? "incomplete" : "complete"}.</p>
          </div>,
        );
        router.refresh();
      } else
        toast(
          <div className="flex items-center gap-2.5">
            <CircleXIcon className="size-5.5 text-red-600" />
            <p>
              {response.message || "Something went wrong. Please try again."}
            </p>
          </div>,
        );
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="flex items-center gap-3 [&>*]:cursor-pointer [&>label]:text-base">
      <Checkbox
        onClick={handleTaskCompletion}
        id={`todo-task-id-${todo.id}`}
        checked={todo.isDone}
      />
      <Label
        htmlFor={`todo-task-id-${todo.id}`}
        className={todo.isDone ? "relative text-neutral-400 line-through" : ""}
      >
        {todo.task}
      </Label>
    </div>
  );
}
