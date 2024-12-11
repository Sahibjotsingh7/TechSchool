import React from 'react';
import { BsEmojiFrown, BsEmojiSunglasses, BsEmojiSmile } from "react-icons/bs";

const ResultDisplay = ({ results, summary, len }) => {
  if (!summary || !results) {
    return <div>Loading results...</div>;
  }

  const marks = Math.round((summary.correct / len) * 100);

  let performanceText, performanceEmoji, performanceColor;
  if (marks > 70) {
    performanceText = "Excellent!";
    performanceEmoji = <BsEmojiSunglasses style={{ color: '#C68642', fontSize: '40px' }} />;
    performanceColor = "#4CAF50";
  } else if (marks > 40) {
    performanceText = "Good!";
    performanceEmoji = <BsEmojiSmile style={{ color: '#C68642', fontSize: '40px' }} />;
    performanceColor = "#FFD700";
  } else {
    performanceText = "Needs Improvement!";
    performanceEmoji = <BsEmojiFrown style={{ color: '#C68642', fontSize: '40px' }} />;
    performanceColor = "#FF6347";
  }

  return (
    <>
      <div className="result-container">
        <div className="performance-summary" style={{marginTop:"100px"}}>
          <h1>Your Performance</h1>
          <div className="performance-container">
            <p className="performance-text">
              {performanceEmoji} {performanceText}
            </p>
            <div className="marks-circle">
              <p>{marks}/100</p>
            </div>
          </div>
          <div className="summary-details">
            <p style={{ color: 'green' }}>Correct: {summary.correct}</p>
            <p style={{ color: 'red' }}>Incorrect: {summary.incorrect}</p>
            <p style={{ color: 'orange' }}>Not Attempted: {summary.notAttempted}</p>
          </div>
        </div>

        <div className="result-display">
          <h2 style={{ marginBottom: "20px" }}>Detailed Results</h2>
          {results.map((result, index) => (
            <div
              key={index}
              className={`result-card ${
                result.isCorrect ? 'correct' : result.chosenOption === 'not attempted' ? 'not-attempted' : 'incorrect'
              }`}
            >
              <div className="question">
                <strong>Q{index + 1}: {result.question.ques}</strong>
              </div>
              <div className="options">
                {result.question.aoptions.map((option, i) => (
                  <p
                    key={i}
                    className={`option ${option === result.chosenOption ? 'chosen-option' : ''}`}
                  >
                    {option} {option === result.question.ans ? '(Correct)' : ''}
                  </p>
                ))}
              </div>
              <div className="explanation">
                <p><strong>Your answer:</strong> {result.chosenOption}</p>
                <p><strong>Correct answer:</strong> {result.question.ans}</p>
                <p><strong>Explanation:</strong> {result.question.explanation}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Inline Styles */}
      <style jsx>{`
        .result-container {
          margin: 20px;
          padding: 30px 100px;
          border: 1px solid #ccc;
          border-radius: 8px;
          background-color: #f9f9f9;
        }

        .performance-summary {
          margin-bottom: 20px;
          background-color: #f0f0f0;
          padding: 20px;
          border-radius: 10px;
          text-align: center;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .marks-circle {
          width: 150px;
          height: 150px;
          border-radius: 50%;
          background-color: ${performanceColor};
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 30px;
          color: white;
          font-weight: bold;
          margin: 20px auto;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }

        .performance-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-bottom: 20px;
        }

        .performance-text {
          font-size: 30px;
          margin-top: 10px;
        }

        .summary-details {
          display: flex;
          justify-content: space-around;
          font-size: 25px;
          margin-top: 20px;
        }

        .result-display {
          margin-top: 100px;
        }

        .result-card {
          margin-bottom: 20px;
          padding: 15px;
          border-radius: 10px;
          background-color: #f7f7f7;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          text-align: left;
        }

        .result-card.correct {
          background-color: #bdebbe;
        }

        .result-card.incorrect {
          background-color: #FFEBEB;
        }

        .result-card.not-attempted {
          background-color: #fff3cd; /* Yellow background */
          border: 1px solid #ffeeba; /* Yellow border */
        }

        .question {
          font-weight: bold;
          font-size: 22px;
        }

        .options {
          margin-top: 10px;
        }

        .option {
          font-size: 20px;
          padding: 5px 10px;
        }

        .chosen-option {
          font-weight: bold;
          background-color: #e0f7fa;
          padding: 5px 10px;
          border-radius: 5px;
        }

        .explanation {
          margin-top: 10px;
          font-size: 20px;
          color: #555;
        }

        h1, h2 {
          color: #333;
        }
      `}</style>
    </>
  );
};

export default ResultDisplay;
