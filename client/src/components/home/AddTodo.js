"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { CircleCheckIcon, CircleXIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function AddTodo() {
  const router = useRouter();

  const handleTodoAdd = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const task = formData.get("new-task");

    if (!task) {
      return toast(
        <div className="flex items-center gap-2.5">
          <CircleXIcon className="size-5.5 text-red-600" />
          <p>A task cannot be empty.</p>
        </div>,
      );
    }

    try {
      const response = await fetch("http://localhost:5000/api/todos/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ task }),
      });

      if (response.ok) {
        event.target.reset();
        toast(
          <div className="flex items-center gap-2.5">
            <CircleCheckIcon className="size-5.5 text-green-600" />
            <p>New task has been added.</p>
          </div>,
        );
        router.refresh();
      } else {
        toast(
          <div className="flex items-center gap-2.5">
            <CircleXIcon className="size-5.5 text-red-600" />
            <p>
              {response.message || "Something went wrong. Please try again."}
            </p>
          </div>,
        );
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <form
      onSubmit={handleTodoAdd}
      className="my-8 mb-20 flex w-full max-w-lg items-center gap-2"
    >
      <Input type="text" name="new-task" placeholder="Add your task" />
      <Button type="submit" variant="default">
        Add
      </Button>
    </form>
  );
}
