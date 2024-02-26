import { Task } from "@/data/schema";
import { create } from "zustand";

type TaskStore = {
  tasks: Task[];
  selectedTaskToEdit: Task | null;
  pushTask: (task: Task) => void;
  setInitialTasks: (tasks: Task[]) => void;
  setSelectedTaskToEdit: (task: Task) => void;
};

export const useTaskStore = create<TaskStore>((set) => ({
  tasks: [],
  selectedTaskToEdit: null,
  pushTask: (task) => {
    set((state) => ({
      tasks: [task, ...state.tasks],
    }));
  },
  setInitialTasks: (tasks) => {
    set((state) => ({
      tasks: tasks,
    }));
  },
  setSelectedTaskToEdit: (task) => {
    set((state) => ({
      selectedTaskToEdit: task,
      tasks: state.tasks,
    }));
  },
}));
