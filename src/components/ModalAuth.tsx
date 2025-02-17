import React, { useState } from "react";
import Modal from "./Modal";
import { STORAGE_KEY } from "../modules/consts";
import { UserTasks } from "../types/userTasks";
import { allUsersTasks } from "../types/allUsersTasks";

const ModalAuth: React.FC<{ isOpen: boolean }> = ({isOpen}) => {
  const [isModalOpen, setIsModalOpen] = useState(isOpen);
  const [login, setLogin] = useState('');

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const getAllUsersLocalStorageTasks = (): allUsersTasks => {
    const storedData = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}') as allUsersTasks;

    return storedData;
  }

  const createAllUsersLocalStorageTasks = (): void => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({}));
  }

  const addNewUserToAllUsersDataInToLocalStorage = (
    allUsersTasks: allUsersTasks, 
    login: string,
  ):void => {
    allUsersTasks[login] = [];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(allUsersTasks));
  }

  const createCurrentUserStorageInLocalStorage = (currentUserDataTasks: UserTasks):void => {
    localStorage.setItem(login, JSON.stringify(currentUserDataTasks));
  }

  const handleLocalStorageData = (): void => {
    let allUsersTasks = getAllUsersLocalStorageTasks();

    if (Object.keys(allUsersTasks).length === 0) {
      allUsersTasks = {};
      createAllUsersLocalStorageTasks();
    }

    if (!allUsersTasks[login]) {
      addNewUserToAllUsersDataInToLocalStorage(allUsersTasks, login);
    }

    createCurrentUserStorageInLocalStorage(allUsersTasks[login]);
  }

  const handleSubmit = (e: React.FormEvent):void => {
    e.preventDefault();
    handleLocalStorageData();
    closeModal();
  };

  return (
    <Modal isOpen={isModalOpen} onClose={closeModal} title="Авторизация">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="login" className="form-label">
            Логин
          </label>
          <input
            type="text"
            id="login"
            className="form-control"
            placeholder="Введите логин"
            value={login}
            required={true}
            onChange={(e) => setLogin(e.target.value)}
          />
        </div>

        <div className="d-flex justify-content-center">
          <button type="submit" className="btn btn-primary">
            Войти
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default ModalAuth;
