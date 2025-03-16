import React from "react";
import Card from "./components/Card";
import "./App.css";
import questionTrivia from "./data/Questtrivia.json";

const App = () => {
  return (
    <div className="App">
      <div className="header">
        <img src="src/assets/icon.webp" alt="icon" width={200} height={200} />
        <h1>Hi Future Developers!!</h1>
      </div>
      
      <h3>I bet you know about these ^^</h3>
      <Card cardsData={questionTrivia.questions}/>
    </div>
  );
};

export default App;
