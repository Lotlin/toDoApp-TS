import React, { useEffect, useState } from "react";
import ModalAuth from "./components/ModalAuth";
import { Tasks } from "./components/Tasks";
import { useAuth } from "./context/AuthContext";

const App: React.FC = () => {
  const login = useAuth().login;
  const [isModalAuthOpen, setIsModalAuthOpen] = useState(!login);

  useEffect(() => {
    if(login) {
      setIsModalAuthOpen(false);
    }
  }, [login])

  const hadleCloseModalAuth = () => {
    setIsModalAuthOpen(false)
  }

  return (
    <>
      {!login && <ModalAuth isOpen={isModalAuthOpen} onClose={hadleCloseModalAuth}/>}
      {!isModalAuthOpen && <Tasks />}
    </>
  );
};

export default App;
