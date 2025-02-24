import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Task } from "../types/task";
import { STORAGE_KEY } from "../modules/consts";
import { useTasks } from "../context/TaskContext";

// toDO сделать ровную таблицу
// toDO сделать кноку выйти

export const Tasks = () => {
  const { login } = useAuth();
  const [newTask, setNewTask] = useState('');

  if (!login) return <div>Пользователь не авторизован</div>;

  const { tasks, toggleTaskCompletion }= useTasks();

  const createTask = (newTask:string): Task => {
    const taskId = Math.random().toString(16).substring(2, 10);

    const task = {
      id: taskId,
      task: newTask,
      isCompleted: false,
    }

    return task;
  }

  const saveTask = (task:Task):void => {
    const storedData = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');

    if (!storedData[login]) {
      storedData[login] = [];
    }

    storedData[login].push(task);

    localStorage.setItem(STORAGE_KEY, JSON.stringify(storedData));
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTask(e.target.value)
  }

  // toDo добавить задачу в таблицу
  const addNewTaskToTable = () => {
    
  }

  const submitNewTaskForm = (e: React.FormEvent):void  => {
    e.preventDefault();
    const task = createTask(newTask);
    console.log('task: ', task);
    saveTask(task);
    setNewTask('');
  }

  if(!tasks.length) {
    return (
      <>
        <h3>Todo App</h3>
        <form className="d-flex align-items-center mb-3" onSubmit={submitNewTaskForm}>
          <label className="form-group me-3 mb-0">
          <input 
              className="form-control" 
              type="text" 
              placeholder="ввести задачу" 
              value={newTask}
              onChange={handleInputChange}
              />
          </label>

          <button 
            className="btn btn-primary me-3" 
            type="submit" 
            disabled={!newTask}
            >
            Сохранить
          </button>

          <button type="reset" className="btn btn-warning" onClick={() => setNewTask('')}>
            Очистить
          </button>
        </form>
        <p>У пользователя {login} нет задач</p>
      </>
    )
  }

  return (
    <>
      <h3>Todo App</h3>
        <form className="d-flex align-items-center mb-3" onSubmit={submitNewTaskForm}>
          <label className="form-group me-3 mb-0">
            <input 
              className="form-control" 
              type="text" 
              placeholder="ввести задачу" 
              value={newTask}
              onChange={handleInputChange}
              />
          </label>

          <button 
            className="btn btn-primary me-3" 
            type="submit" 
            disabled={!newTask}
            >
            Сохранить
          </button>

          <button type="reset" className="btn btn-warning" onClick={() => setNewTask('')}>
            Очистить
          </button>
        </form>
        <div className="table-wrapper">
        <table className="table table-hover table-bordered">
            <thead>
              <tr>
                <th>№</th>
                <th>Задача</th>
                <th>Статус</th>
                <th>Действия</th>
              </tr>
            </thead>

            <tbody>
            { tasks.map((task, index) => (
              <tr key={task.id} className="table-light">
                <td>{index + 1}</td>
                <td className={`task ${task.isCompleted ? 'text-decoration-line-through' : ''}`}>
                  {task.task}
                </td>
                <td>{task.isCompleted ? 'Завершена' : 'В процессе'}</td>
                <td>
                  <button className="btn btn-danger">
                    Удалить
                  </button>
                  <button className="btn btn-success" onClick={() => toggleTaskCompletion(task.id)}>
                    Завершить
                  </button>
                </td>
              </tr>
            ))}
            </tbody>
        </table>
      </div>
    </>
  );
}