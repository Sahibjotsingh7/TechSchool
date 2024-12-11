import React, { useState, useEffect } from 'react';
import './App.css';
import ResultDisplay from './ResultDisplay';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CodePractice = () => {
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [result, setResults] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const[showResultsbutton , setShowResultsbutton] = useState(false);
  

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const storedUserInfo = JSON.parse(localStorage.getItem('loginInfo'));
        if (!storedUserInfo.token) {
          throw new Error('User is not authenticated');
        }
  
        const response = await fetch('http://localhost:8080/api/mcqs/codemcqs', {
          headers: {
            Authorization: `Bearer ${storedUserInfo.token}`,
          },
        });
  
        if (!response.ok) {
          throw new Error('Failed to fetch MCQs');
        }
  
        const data = await response.json();
        setQuestions(data);
        setTimeout(() => setIsLoading(false), 1000);
      } catch (error) {
        console.error('Error fetching MCQs:', error);
        setIsLoading(false);
      }
    };
  
    fetchQuestions();
  }, []);
  

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const selectedAnswers = questions.map((question, index) => {
      const selectedOption = document.querySelector(`input[name="question${index}"]:checked`);
      return {
        id: question._id,
        option: selectedOption ? selectedOption.value : 'not attempted',
      };
    });
  
    const requestBody = {
      answers: selectedAnswers,
      collection: 'codemcqs',
    };
  
    try {
      const storedUserInfo = JSON.parse(localStorage.getItem('loginInfo'));
      if (!storedUserInfo.token) {
        throw new Error('User is not authenticated');
      }
  
      const response = await fetch('http://localhost:8080/api/mcqs/checkanswers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${storedUserInfo.token}`,
        },
        body: JSON.stringify(requestBody),
      });
  
      if (!response.ok) {
        throw new Error('Failed to submit answers');
      }
  
      const data = await response.json();
      setResults(data);
      toast.success('Quiz submitted successfully!');
  
      setIsLoading(true);
      setTimeout(() => {
        setShowResultsbutton(true);
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error submitting answers:', error);
      toast.error('Failed to submit answers.');
    }
  };
  

  if (isLoading) {
    return <div className="container"><h1 style={{marginTop:"100px"}}>Please Wait...</h1></div>;
  }

  if(showResults){
    return <ResultDisplay results={result.results} summary = {result.summary} len={questions.length}/>
  }

  return (
    <div className="container">
      <ToastContainer />
       
      <h1 style={{marginTop:"100px"}}>Coding Quiz</h1>
      {showResultsbutton ? (
        <div>
           <button className="submit-button" onClick={()=>{setShowResults(true)}}>view result</button>
        </div>
      ) : (
        <form className="card" onSubmit={handleSubmit}>
          {questions.length > 0 ? (
            questions.map((question, index) => (
              <div key={index} className="radio-group">
                <div className="question">
                  {index + 1}. {question.ques}
                </div>
                <div className='options'>
                  {question.aoptions.map((option, i) => (
                    <label key={i} className="answer">
                      <input type="radio" name={`question${index}`} value={option} />
                      {option}
                    </label>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div>No questions available at the moment.</div>
          )}
          <button type="submit" className="submit-button">Submit Answers</button>
        </form>
      )}
    </div>
  );
};

export default CodePractice;
