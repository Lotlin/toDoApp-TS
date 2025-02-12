import React, { useState } from "react";
import ModalAuth from "./components/ModalAuth";

const App: React.FC = () => {
  console.log(1);

  return (
    <div>
      <ModalAuth isOpen={true} />
    </div>
  );
};

export default App;
