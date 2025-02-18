import React, { useState } from "react";
import ModalAuth from "./components/ModalAuth";
import { Tasks } from "./components/Tasks";

const App: React.FC = () => {
  const [isModalAuthOpen, setIsModalAuthOpen] = useState(true);

  const hadleCloseModalAuth = () => {
    setIsModalAuthOpen(false)
  }

  return (
    <>
      <ModalAuth isOpen={isModalAuthOpen} onClose={hadleCloseModalAuth}/>
      {!isModalAuthOpen && <Tasks />}
    </>
  );
};

export default App;
