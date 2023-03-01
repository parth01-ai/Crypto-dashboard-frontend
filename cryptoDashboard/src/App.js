import React from "react";
import MainPart from "./Components/MainPart/MainPart";
import Navbar from "./Components/Navbar/Navbar";

import "./App.css";

const App = () => {
  return (
    <div style={{ marginLeft: "35px", marginRight: "35px" }}>
      <Navbar />
      <MainPart />
    </div>
  );
};

export default App;
