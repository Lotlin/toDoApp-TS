import React, { createContext, useContext, useEffect, useState } from "react";
import { UserTasks } from "../types/userTasks";
import { useAuth } from "./AuthContext";
import { STORAGE_KEY } from "../modules/consts";
import { Task } from "../types/task";

const TaskContext = createContext<{
  tasks: UserTasks | [];
  addTask: (taskTitle: string) => void;
  toggleTaskCompletion: (id: string) => void;
  deleteTask: (id: string) => void;
}>(
  {
    tasks: [],
    addTask: () => {},
    toggleTaskCompletion: () => {},
    deleteTask: () => {},
  }
);

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const login = useAuth().login;
  const [tasks, setTasks] = useState<UserTasks | []>([]);

  const allTasks = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");

  useEffect(() => {
    if (!login) return;

    const userTasks = allTasks[login] || [];
    setTasks(userTasks);
  }, [login]);

  const updateTasks = (updatedTasks: Task[]) => {
    if (!login) return;

    const updatedAllTasks = { ...allTasks, [login]: updatedTasks };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedAllTasks));

    setTasks(updatedTasks);
  };

  const createTask = (taskTitle:string): Task => {
    const taskId = Math.random().toString(16).substring(2, 10);

    const task = {
      id: taskId,
      task: taskTitle,
      isCompleted: false,
    }

    return task;
  }

  const addTask = (taskTitle:string) => {
    const newTask = createTask(taskTitle);
    const updatedTasks = [...tasks, newTask]; 

    updateTasks(updatedTasks);
  }

  const toggleTaskCompletion = (id: string) => {
    const updatedTasks = tasks.map((task) => {
      return task.id === id ? { ...task, isCompleted: !task.isCompleted } : task;
    });

    updateTasks(updatedTasks);
  }

  const deleteTask = (id: string) => {
    const updatedTasks = tasks.filter(task => task.id !== id);

    updateTasks(updatedTasks);
  }

  return (
    <TaskContext.Provider value={{ tasks, addTask, toggleTaskCompletion, deleteTask }}>
      { children }
    </TaskContext.Provider>
  )
};

export const useTasks = () => useContext(TaskContext);
