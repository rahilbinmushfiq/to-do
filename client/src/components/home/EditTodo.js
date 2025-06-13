"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { CircleCheckIcon, CircleXIcon, PencilLineIcon } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function EditTodo({ todo }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const handleTodoEdit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const task = formData.get("task");

    if (!task) {
      return toast(
        <div className="flex items-center gap-2.5">
          <CircleXIcon className="size-5.5 text-red-600" />
          <p>A task cannot be empty.</p>
        </div>,
      );
    }

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
            task,
          }),
        },
      );

      if (response.ok) {
        toast(
          <div className="flex items-center gap-2.5">
            <CircleCheckIcon className="size-5.5 text-green-600" />
            <p>Task has been updated.</p>
          </div>,
        );
        setOpen(false);
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
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="secondary" size="icon" className="size-8">
          <PencilLineIcon />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleTodoEdit}>
          <DialogHeader>
            <DialogTitle>Edit To-do</DialogTitle>
            <DialogDescription>
              Update your task here. Click save when you&apos;re done.
            </DialogDescription>
          </DialogHeader>
          <div className="mb-3 grid gap-3">
            <Label htmlFor="name-1">Task</Label>
            <Input
              id="task"
              name="task"
              defaultValue={todo.task || "Add your task name"}
            />
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
