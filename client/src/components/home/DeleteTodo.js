"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { CircleCheckIcon, CircleXIcon, Trash2Icon } from "lucide-react";
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

export default function DeleteTodo({ todo }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const handleTodoDelete = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/todos/${todo._id}`,
        {
          method: "DELETE",
        },
      );

      if (response.ok) {
        toast(
          <div className="flex items-center gap-2.5">
            <CircleCheckIcon className="size-5.5 text-green-600" />
            <p>Task has been deleted.</p>
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
        <Button variant="destructive" size="icon" className="size-8">
          <Trash2Icon />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button onClick={handleTodoDelete} variant="destructive">
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
