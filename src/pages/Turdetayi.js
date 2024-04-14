import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import Urundata from "../components/Urundata";

const Turdetayi = () => {
  const { id } = useParams();
  const { error, isLoading, data } = useFetch(
    "http://localhost:1337/api/quizzes?populate=*"
  );

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState([]);

  const handleAnswer = (selectedAnswer) => {
    const correctAnswer = data.data[currentQuestion].attributes.dogrucevap;
    if (selectedAnswer === correctAnswer) {
      setScore(score + 1);
    }
    setAnsweredQuestions([...answeredQuestions, currentQuestion]);
    setCurrentQuestion(currentQuestion + 1);
  };

  if (isLoading) {
    return <h1>Loading</h1>;
  }

  if (error) {
    return <h1>Error</h1>;
  }

  const quizzes = data.data;
  const totalQuestions = quizzes.length;

  return (
    <div className="quiz-container">
      {currentQuestion < totalQuestions ? (
        <div>
          <Urundata />
          <Question
            quiz={quizzes[currentQuestion]}
            handleAnswer={handleAnswer}
          />
          <div className="progress-bar-container">
            <div
              className="progress-bar"
              style={{ width: `${(currentQuestion / totalQuestions) * 100}%` }}
            ></div>
            <span className="progress-text">
              {currentQuestion + 1}/{totalQuestions}
            </span>
          </div>
        </div>
      ) : (
        <ResultPage score={score} />
      )}
    </div>
  );
};

const Question = ({ quiz, handleAnswer }) => {
  const { Soru, cevapbir, cevapiki, cevapuc, cevapdort } = quiz.attributes;

  return (
    <div className="quiz-container">
      <div>
        <img
          src={
            "http://localhost:1337" + quiz.attributes.resim.data.attributes.url
          }
        />
      </div>
      <div className="question-container">
        <div>
          <h1>{Soru}</h1>
        </div>
        <div className="cevaps">
          <div>
            <button
              className="answer-btn"
              onClick={() => handleAnswer(cevapbir)}
            >
              {cevapbir}
            </button>
            <button
              className="answer-btn"
              onClick={() => handleAnswer(cevapiki)}
            >
              {cevapiki}
            </button>
          </div>
          <div>
            <button
              className="answer-btn"
              onClick={() => handleAnswer(cevapuc)}
            >
              {cevapuc}
            </button>
            <button
              className="answer-btn"
              onClick={() => handleAnswer(cevapdort)}
            >
              {cevapdort}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const ResultPage = ({ score }) => {
  return (
    <div>
      <h1>Result Page. Your score is {score}</h1>
    </div>
  );
};

export default Turdetayi;
