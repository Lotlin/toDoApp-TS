import React, { createContext, useContext, useEffect, useState } from "react";
import { UserTasks } from "../types/userTasks";
import { useAuth } from "./AuthContext";
import { STORAGE_KEY } from "../modules/consts";

const TaskContext = createContext<{
  tasks: UserTasks | [];
  toggleTaskCompletion: (id: string) => void;
}>(
  {
    tasks: [],
    toggleTaskCompletion: () => {}
  }
);

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const login = useAuth().login;
  const [tasks, setTasks] = useState<UserTasks | []>([]);

  if (!login) return;

  const allTasks = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");

  useEffect(() => {
    const userTasks = allTasks[login] || [];
    setTasks(userTasks);
  }, [login]);

  const toggleTaskCompletion = (id: string) => {
    const updatedTasks = tasks.map((task) => {
      return task.id === id ? { ...task, isCompleted: !task.isCompleted } : task;
    });

    setTasks(updatedTasks);
    const updatedAllTasks = { ...allTasks, [login]: updatedTasks };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedAllTasks));
  }

  return (
    <TaskContext.Provider value={{ tasks, toggleTaskCompletion }}>
      { children }
    </TaskContext.Provider>
  )
};

export const useTasks = () => useContext(TaskContext);
