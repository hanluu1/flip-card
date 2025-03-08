import React, { useState } from "react";

const Card = () => {
  const cardsData = [
    { frontContent: "Leggo!", backContent: "Next to start" },
    { frontContent: "What are the most in-demand programming languages in 2025?", backContent: "Python, JavaScript, TypeScript, Go, Rust, and Java are among the most in-demand languages." },
    { frontContent: "What is the difference between frontend and backend development?", backContent: "Frontend development focuses on the user interface (HTML, CSS, JavaScript), while backend development handles server logic, databases, and APIs." },
    { frontContent: "What’s the difference between SQL and NoSQL databases?", backContent: "SQL databases are structured and use tables (MySQL, PostgreSQL), while NoSQL databases handle unstructured data (MongoDB, Redis)." },
    { frontContent: "What is Big-O notation?", backContent: "Big-O notation describes the worst-case complexity of an algorithm in terms of time and space." },
    { frontContent: "What is REST API and how does it work?", backContent: "REST (Representational State Transfer) API allows systems to communicate using HTTP methods like GET, POST, PUT, DELETE." },
    { frontContent: "What are the top cloud providers used today?", backContent: "AWS, Microsoft Azure, and Google Cloud are the leading cloud providers." },
    { frontContent: " What is the OWASP Top 10?", backContent: "It’s a list of the top 10 most critical web security risks, including SQL injection, XSS, and broken authentication." },
    { frontContent: "What are common applications of AI in programming?", backContent: "AI is used in code completion (GitHub Copilot), chatbots, data analysis, and automation." },
    { frontContent: "What is the purpose of Git in software development?", backContent: "Git is a distributed version control system that helps track changes, collaborate with teams, and manage code repositories." },
  ];

  const [currentCard, setCurrentCard] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const handleClick = () => {
    setFlipped(!flipped);
  };

  const handleNext = () => {
    setFlipped(false); 
    setCurrentCard((prevCard) => (prevCard + 1) % cardsData.length);
  };

  const handlePrev = () => {
    setFlipped(false); 
    setCurrentCard((prevCard) => (prevCard - 1 + cardsData.length) % cardsData.length);
  };

  return (
    <div>
      <p>Number of Cards: {cardsData.length}</p>
      <div className={`card ${flipped ? "flipped" : ""}`} onClick={handleClick}>
        <div className="card-front">{cardsData[currentCard].frontContent}</div>
        <div className="card-back">{cardsData[currentCard].backContent}</div>
      </div>

      <div className="buttons">
        <button onClick={handlePrev}>Previous</button>
        <button onClick={handleNext}>Next</button>
      </div>
    </div>
  );
};

export default Card;
