import { DotsHorizontalIcon, DropdownMenuIcon } from "@radix-ui/react-icons";
import { Row } from "@tanstack/react-table";
import { doc, deleteDoc, setDoc } from "firebase/firestore";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SheetTrigger } from "@/components/ui/sheet";

import { labels } from "../data/data";
import { Task, taskSchema } from "../data/schema";
import { useTaskStore } from "@/stores/task-store";
import { db } from "@/firebase/config";
import { Copy, Pencil, Trash2 } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import { toast } from "sonner";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const task = taskSchema.parse(row.original);
  const pushTask = useTaskStore((state) => state.pushTask);
  const setSelectedTaskToEdit = useTaskStore(
    (state) => state.setSelectedTaskToEdit
  );

  const { deleteTask } = useTaskStore();

  async function handleDeleteTask(task: Task) {
    const id: string = task.id;
    deleteTask(task);
    await deleteDoc(doc(db, "tasks", id));
  }

  async function handleDuplicateTask(task: Task) {
    let newTask = task;
    const newId = `TASK-${uuidv4()}`;
    newTask["id"] = newId;
    await setDoc(doc(db, "tasks", `${newId}`), newTask);
    pushTask(newTask);
    toast.success("Successfully duplicated.");
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <DotsHorizontalIcon className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <SheetTrigger
          className="w-full"
          onClick={() => setSelectedTaskToEdit(task)}
        >
          <DropdownMenuItem>
            Edit
            <Pencil className="ml-auto h-4 w-4" />
          </DropdownMenuItem>
        </SheetTrigger>

        <DropdownMenuItem
          onClick={() => {
            handleDuplicateTask(task);
          }}
        >
          Make a copy <Copy className="ml-auto h-4 w-4" />
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="text-red-200"
          onClick={() => {
            handleDeleteTask(task);
          }}
        >
          Delete
          <Trash2 className="ml-auto h-4 w-4 text-red-200" />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
