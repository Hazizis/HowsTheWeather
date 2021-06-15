import React from "react";
import Header from "./Header";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Header
        defaultCity="Mataram"
        unitC={{
          color: `#fcfeff`,
          backgroundColor: `#465866`,
          borderRadius: `50%`,
          cursor: `default`,
        }}
      />{" "}
    </div>
  );
}

export default App;
