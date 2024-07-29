import { create, StateCreator } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { v4 as uuidV4 } from "uuid";
//import { produce } from "immer";

import type { Task, TaskStatus } from "../../interfaces";
import { immer } from "zustand/middleware/immer";

interface TaskState {
  tasks: Record<string, Task>;
  draggingTaskId?: string;

  getTaskByStatus: (status: TaskStatus) => Task[];

  setDraggingTaskId: (taskId: string) => void;

  removeDraggingTaskId: () => void;
  addTask: (title: string, status: TaskStatus) => void;

  changeTaksStatus: (taskId: string, status: TaskStatus) => void;

  onTaskDrop: (status: TaskStatus) => void;
}

const storeApi: StateCreator<TaskState, [["zustand/immer", never]]> = (
  set,
  get
) => ({
  tasks: {
    "ABC-1": { id: "ABC-1", status: "open", title: "Tarea 1" },
    "ABC-2": { id: "ABC-2", status: "open", title: "Tarea 2" },
    "ABC-3": { id: "ABC-3", status: "open", title: "Tarea 3" },
    "ABC-4": { id: "ABC-4", status: "in-progress", title: "Tarea 4" },
  },

  draggingTaskId: undefined,

  getTaskByStatus: (status: TaskStatus) => {
    const tasks = get().tasks;
    return Object.values(tasks).filter((task) => task.status === status);
  },

  setDraggingTaskId: (taskId: string) => {
    set({ draggingTaskId: taskId });
  },

  removeDraggingTaskId: () => {
    set({ draggingTaskId: undefined });
  },

  changeTaksStatus: (taskId: string, status: TaskStatus) => {
    //const task = get().tasks[taskId];
    //task.status = status;

    set((state) => {
      state.tasks[taskId].status = status;
    });

    //set((state) => ({
    //  tasks: {
    //    ...state.tasks,
    //    [taskId]: task,
    //  },
    //}));
  },

  onTaskDrop: (status: TaskStatus) => {
    const taskId = get().draggingTaskId;
    if (!taskId) return;

    get().changeTaksStatus(taskId, status);
    get().removeDraggingTaskId();
  },

  addTask: (title, status) => {
    const newTask: Task = { id: uuidV4(), status, title };
    set((state) => {
      state.tasks[newTask.id] = newTask;
    });

    //? Requiere Immer
    //set(
    //  produce((state: TaskState) => {
    //    state.tasks[newTask.id] = newTask;
    //  })
    //);

    //Forma Nativa
    //set((state) => ({
    //  tasks: {
    //    ...state.tasks,
    //    [newTask.id]: newTask,
    //  },
    //}));
  },
});

export const useTaskStore = create<TaskState>()(
  persist(devtools(immer(storeApi)), { name: "task-store" })
);
