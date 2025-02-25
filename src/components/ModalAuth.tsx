import React, { useState } from "react";
import Modal from "./Modal";
import { CURRENT_USER_STORAGE_KEY, STORAGE_KEY } from "../modules/consts";
import { allUsersTasks } from "../types/allUsersTasks";
import { useAuth } from "../context/AuthContext";

const ModalAuth: React.FC<{ isOpen: boolean; onClose: () => void }> = ({isOpen, onClose}) => {
  const { setLogin, logout } = useAuth();
  const [login, setLoginLocal] = useState('');

  const closeAndLogout = () => {
    logout();
    onClose();
  }

  const getUsersTasks = (): allUsersTasks => {
    const storedData = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}') as allUsersTasks;

    return storedData;
  }

  const createUsersTasks = (): void => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({}));
  }

  const addUserToStorage = (
    allUsersTasks: allUsersTasks, 
    login: string,
  ):void => {
    allUsersTasks[login] = [];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(allUsersTasks));
  }

  const saveLoginToStorage = (login:string): void => {
    localStorage.setItem(CURRENT_USER_STORAGE_KEY, login);
  }

  const initializeUserData = (): void => {
    let allUsersTasks = getUsersTasks();

    if (Object.keys(allUsersTasks).length === 0) {
      allUsersTasks = {};
      createUsersTasks();
    }

    if (!allUsersTasks[login]) {
      addUserToStorage(allUsersTasks, login);
    }

    saveLoginToStorage(login);
  }

  const submitForm = (e: React.FormEvent):void => {
    e.preventDefault();
    setLogin(login);
    initializeUserData();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={closeAndLogout} title="Авторизация">
      <form onSubmit={submitForm}>
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
            onChange={(e) => setLoginLocal(e.target.value)}
          />
        </div>

        <div className="d-flex justify-content-center">
          <button type="submit" className="btn btn-primary" disabled={!login}>
            Войти
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default ModalAuth;
