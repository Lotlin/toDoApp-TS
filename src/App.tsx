import React, { useEffect, useState } from "react";
import { TaskProvider } from "./context/TaskContext";
import ModalAuth from "./components/ModalAuth";
import { Tasks } from "./components/Tasks";
import { useAuth } from "./context/AuthContext";

const App: React.FC = () => {
  const login = useAuth().login;
  const [isModalAuthOpen, setIsModalAuthOpen] = useState(!login);

  useEffect(() => {
    setIsModalAuthOpen(!login);
  }, [login]);

  const hadleCloseModalAuth = () => {
    setIsModalAuthOpen(false)
  }

  return (
    <>
      {!login && <ModalAuth isOpen={isModalAuthOpen} onClose={hadleCloseModalAuth}/>}
      <TaskProvider>
        {!isModalAuthOpen && <Tasks />}
      </TaskProvider>
    </>
  );
};

export default App;
