import { useAuth } from "../context/AuthContext";

export const Tasks = () => {
  const { login } = useAuth();
  console.log('login: ', login);
  if (!login) return <div>Пользователь не авторизован</div>;

  return (
    <>
      <h3>Todo App</h3>
        <form className="d-flex align-items-center mb-3">
          <label className="form-group me-3 mb-0">
            <input type="text" className="form-control" placeholder="ввести задачу" />
          </label>

          <button type="submit" className="btn btn-primary me-3">
            Сохранить
          </button>

          <button type="reset" className="btn btn-warning">
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
              <tr className="table-light">
                <td>1</td>
                <td className="task">
                  Купить слона
                </td>
                <td>В процессе</td>
                <td>
                  <button className="btn btn-danger">
                    Удалить
                  </button>
                  <button className="btn btn-success">
                    Завершить
                  </button>
                </td>
              </tr>

              <tr className="table-success">
                <td>2</td>
                <td className="text-decoration-line-through">
                  Помыть кота
                </td>
                <td>Выполнена</td>
                <td>
                  <button className="btn btn-danger">
                    Удалить
                  </button>
                  <button className="btn btn-success">
                    Завершить
                  </button>
                </td>
              </tr>
            </tbody>
        </table>
      </div>
    </>
  );
}