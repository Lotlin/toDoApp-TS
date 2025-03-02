import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useTasks } from "../context/TaskContext";

export const Tasks = () => {
  const { login, logout } = useAuth();
  const [newTask, setNewTask] = useState('');

  if (!login) return <div>Пользователь не авторизован</div>;

  const { tasks, addTask, toggleTaskCompletion, deleteTask }= useTasks();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTask(e.target.value)
  }
  
  const submitNewTaskForm = (e: React.FormEvent):void  => {
    e.preventDefault();
    addTask(newTask);
    setNewTask('');
  }
  return (
    <>
      <button className="btn btn-primary position-absolute top-0 end-0 m-3" onClick={logout}>
        Выйти
      </button>
      <h3>Todo App</h3>
        <form className="d-flex align-items-center mb-3 w-100" onSubmit={submitNewTaskForm} style={{ maxWidth: '474px' }}>
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
        {
          tasks.length ? (
            <table className="table table-hover table-bordered" style={{ width: '474px' }}>
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
                    <td className="d-flex justify-content-center gap-3">
                      <button className="btn btn-danger" onClick={() => deleteTask(task.id)}>
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
          ) : (
                <p>У пользователя {login} нет задач</p>
            )
        }
      </div>
    </>
  );
}
