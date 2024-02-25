import { Task } from "@/data/schema";
import { create } from "zustand";

type TaskStore = {
  tasks: Task[];
  pushTask: (task: Task) => void;
  setInitialTasks: (tasks: Task[]) => void;
};

export const useTaskStore = create<TaskStore>((set) => ({
  tasks: [],
  pushTask: (task) => {
    set((state) => ({
      tasks: [task, ...state.tasks],
    }));
  },
  setInitialTasks: (tasks) => {
    set((state) => ({
      tasks: [...tasks, ...state.tasks],
    }));
  },
}));
