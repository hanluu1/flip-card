import React, { useState } from "react";
import stringSimilarity from "string-similarity"
const Card = ({ cardsData }) => {
  const [currentCard, setCurrentCard] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [userAnswer, setUserAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [currentStreak, setCurrentStreak] = useState(0);
  const [longestStreak, setLongestStreak] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [warning, setWarning] = useState("");
  const [masteredCards, setMasteredCards] = useState([]);

  const activeCards= cardsData.filter((card)  => !masteredCards.includes(card.frontContent));
  if (activeCards.length === 0) return <p>🎉 You've mastered all the cards! 🎉</p>;

  const handleClick = () => {
    if (submitted){
    setFlipped(!flipped);}
    else {
      setWarning('Try again after submitting your answer!!');
    }
  };

  const handleNext = () => {
    setFlipped(false);
    setFeedback("");
    setUserAnswer("");
    setWarning("");
    setSubmitted(false);
    setCurrentCard((prevCard) => (prevCard + 1) % cardsData.length);
  };

  const handlePrev = () => {
    setFlipped(false);
    setFeedback("");
    setUserAnswer("");
    setWarning("");
    setSubmitted(false);
    setCurrentCard((prevCard) => (prevCard - 1 + cardsData.length) % cardsData.length);
  };

  const handleSubmit = () => {
    const similarity = stringSimilarity.compareTwoStrings(userAnswer.toLowerCase(), cardsData[currentCard].backContent.toLowerCase());
    const userAnswerFirstChar = userAnswer.trim().charAt(0).toLowerCase();
    const targetAnswerFirstChar = cardsData[currentCard].backContent.trim().charAt(0).toLowerCase();
    if (userAnswerFirstChar === targetAnswerFirstChar || similarity > 0.5){
      setFeedback("Correct! ✅")
      setCurrentStreak((prevStreak) => {
        const newStreak = prevStreak + 1;
        if (newStreak > longestStreak) {
          setLongestStreak(newStreak);
        }
        return newStreak;
      })
      
    }
    else {
      setFeedback("Incorrect, try again or click to flip card! 🔄 😊");
      setCurrentStreak(0);
    } 
    setSubmitted(true);
    setWarning("");
  };
  const handleShuffle = () => {
    setFlipped(false);
    setFeedback("");
    setUserAnswer("");
    setCurrentCard(Math.floor(Math.random() * cardsData.length));
  };
  if (!cardsData || cardsData.length === 0) return <p>No cards to display</p>;
  const currentOptions = cardsData[currentCard].options || [];
  
  const handleMastered = () => {
    setMasteredCards([...masteredCards, activeCards[currentCard].frontContent]);
    setSubmitted(false);
    setFlipped(false);
    setFeedback("");

    if (activeCards.length > 1) {
      setCurrentCard((prevCard) => (prevCard + 1) % activeCards.length);
    }
  }

  return (
    <div>
      <h4>Number of Cards: {cardsData.length}</h4>
      <h4> Current Streak: {currentStreak}, Longest Streak: {longestStreak} </h4>
      
      <div className={`card ${flipped ? "flipped" : ""}`} onClick={handleClick}>
        <div className="card-front">
          <p>{cardsData[currentCard].frontContent}</p>
          {currentOptions.map((option, index) => (
            <p key={index}>{option}</p>
          ))}
        </div>
        {flipped && <div className="card-back">{cardsData[currentCard].backContent}</div>}
      </div>
      <h4>{feedback}</h4>
      
      {warning && <div className="warning">{warning}</div>}

      <div className="input-container">
        <input
          type="text"
          placeholder="Enter your answer"
          value={userAnswer}
          onChange={(e) => {setUserAnswer(e.target.value)
            setWarning("");
          }}
        />
        <button onClick={handleSubmit}>Submit</button>
          
      </div>
      <button onClick={handleMastered} disabled={!submitted}>
        Mark as Mastered ✅
      </button>

      
    
      <div className="buttons">
        <button onClick={handlePrev}>Previous</button>
        <div className="shuffle">
        <button onClick={handleShuffle}>
          <img src="src/assets/buttonshuffle.png" width={20} height={20} alt="shuffle"  />
        </button>
        </div>
        <button onClick={handleNext}>Next</button>
      </div>
      
    </div>
  );
};

export default Card;