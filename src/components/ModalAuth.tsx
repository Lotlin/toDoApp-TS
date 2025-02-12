import React, { useEffect, useState } from "react";
import Modal from "./Modal";

const ModalAuth: React.FC<{ isOpen: boolean }> = ({isOpen}) => {
  const [isModalOpen, setIsModalOpen] = useState(isOpen);
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    setIsModalOpen(isOpen);
  }, [isOpen]);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Авторизация с логином:", login, "и паролем:", password);
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
            onChange={(e) => setLogin(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Пароль
          </label>
          <input
            type="password"
            id="password"
            className="form-control"
            placeholder="Введите пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Войти
        </button>
      </form>
    </Modal>
  );
};

export default ModalAuth;
