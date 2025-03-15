import React, { useState } from "react";

const Card = ({ cardsData }) => {
  const [currentCard, setCurrentCard] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [userAnswer, setUserAnswer] = useState("");
  const [feedback, setFeedback] = useState("");

  const handleClick = () => {
    setFlipped(!flipped);
  };

  const handleNext = () => {
    setFlipped(false);
    setFeedback("");
    setUserAnswer("");
    setCurrentCard((prevCard) => (prevCard + 1) % cardsData.length);
  };

  const handlePrev = () => {
    setFlipped(false);
    setFeedback("");
    setUserAnswer("");
    setCurrentCard((prevCard) => (prevCard - 1 + cardsData.length) % cardsData.length);
  };

  const handleSubmit = () => {
    if (userAnswer.toLowerCase() === cardsData[currentCard].backContent.toLowerCase()) {
      setFeedback("Correct! ✅ ");
    } else {
      setFeedback("Incorrect, try again or click to flip card! 🔄 😊");
    }
  };
  if (!cardsData || cardsData.length === 0) return <p>No cards to display</p>;
  const currentOptions = cardsData[currentCard].options || [];

  return (
    <div>
      <p>Number of Cards: {cardsData.length}</p>
      <div className={`card ${flipped ? "flipped" : ""}`} onClick={handleClick}>
        <div className="card-front">
          <p>{cardsData[currentCard].frontContent}</p>
          {currentOptions.map((option, index) => (
            <p key={index}>{option}</p>
          ))}
        </div>
        {flipped && <div className="card-back">{cardsData[currentCard].backContent}</div>}
      </div>

      {!flipped && (
        <div>
          <input
            type="text"
            placeholder="Enter your answer"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
          />
          <button onClick={handleSubmit}>Submit</button>
          <p>{feedback}</p>
        </div>
      )}

      <div className="buttons">
        <button onClick={handlePrev}>Previous</button>
        <button onClick={handleNext}>Next</button>
      </div>
    </div>
  );
};

export default Card;