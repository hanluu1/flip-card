import React from "react";
import Card from "./components/Card";
import "./App.css";
import questionTrivia from "./data/Questtrivia.json";

const App = () => {
  return (
    <div className="App">
      <h1>Hi Future Programers!!</h1>
      <h3>I bet you know about these ^^</h3>
      <Card cardsData={questionTrivia.questions}/>
    </div>
  );
};

export default App;
