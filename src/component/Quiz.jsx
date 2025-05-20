import React, { useState, useEffect } from "react";
import "../component/styles.css"; // Import your CSS file

const QuizApp = () => {
  const quizQuestions = [
    {
      question: "Which of the following is NOT a JavaScript data type?",
      options: ["String", "Number", "Boolean", "Character"],
      answer: "Character",
    },
    {
      question: "Which keyword is used to declare a variable in JavaScript?",
      options: ["var", "let", "const", "All of the above"],
      answer: "All of the above",
    },
    {
      question: "What does the '===' operator check in JavaScript?",
      options: ["Value only", "Type only", "Value and type", "Neither value nor type"],
      answer: "Value and type",
    },
    {
      question: "What is the output of: console.log(typeof null)?",
      options: ["object", "null", "undefined", "boolean"],
      answer: "object",
    },
    {
      question: "Which method is used to convert a string to an array?",
      options: ["split()", "join()", "splice()", "slice()"],
      answer: "split()",
    },
    {
      question: "How do you write a comment in JavaScript?",
      options: [
        "// This is a comment",
        "/* This is a comment */",
        "<!-- This is a comment -->",
        "Both // and /* */",
      ],
      answer: "Both // and /* */",
    },
    {
      question: "Which method is used to add an element to the end of an array?",
      options: ["push()", "pop()", "shift()", "unshift()"],
      answer: "push()",
    },
    {
      question: "What is the default value of variables declared with 'var'?",
      options: ["undefined", "null", "0", "NaN"],
      answer: "undefined",
    },
    {
      question: "Which of the following is used to check if a property exists in an object?",
      options: ["hasOwnProperty()", "in", "both", "none"],
      answer: "both",
    },
    {
      question: "What will 'typeof NaN' return?",
      options: ["number", "NaN", "undefined", "string"],
      answer: "number",
    },
    {
      question: "What will 'console.log([] + [])' return?",
      options: ["''", "[]", "undefined", "null"],
      answer: "''",
    },
    {
      question: "Which loop will execute at least once, regardless of the condition?",
      options: ["for", "while", "do-while", "none"],
      answer: "do-while",
    },
    {
      question: "Which method is used to remove the last element from an array?",
      options: ["pop()", "push()", "shift()", "splice()"],
      answer: "pop()",
    },
    {
      question: "How do you declare a constant in JavaScript?",
      options: ["const", "var", "let", "constant"],
      answer: "const",
    },
    {
      question: "Which operator is used to assign a value to a variable?",
      options: ["=", "==", "===", "!="],
      answer: "=",
    },
    {
      question: "What does JSON stand for?",
      options: [
        "JavaScript Object Notation",
        "Java Syntax Object Notation",
        "JavaScript Operational Node",
        "None of the above",
      ],
      answer: "JavaScript Object Notation",
    },
  ];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userScore, setUserScore] = useState(0);
  const [isQuizFinished, setIsQuizFinished] = useState(false);
  const [currentFeedback, setCurrentFeedback] = useState("");
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [isTimerActive, setIsTimerActive] = useState(true);
  const [userAnswers, setUserAnswers] = useState([]);
  const [currentView, setCurrentView] = useState("quiz");

  useEffect(() => {
    let timerInterval;
    if (isTimerActive) {
      timerInterval = setInterval(() => {
        setTimeElapsed((prevTimeElapsed) => prevTimeElapsed + 1);
      }, 1000);
    }
    return () => clearInterval(timerInterval);
  }, [isTimerActive]);

  const handleAnswerSelection = (selectedOption) => {
    const currentQuestion = quizQuestions[currentQuestionIndex];
    const isCorrect = selectedOption === currentQuestion.answer;

    setUserAnswers([
      ...userAnswers,
      {
        question: currentQuestion.question,
        selectedOption,
        correctAnswer: currentQuestion.answer,
        isCorrect,
      },
    ]);

    if (isCorrect) {
      setUserScore(userScore + 1);
      setCurrentFeedback("Correct!");
    } else {
      setCurrentFeedback("Incorrect!");
    }

    const nextQuestionIndex = currentQuestionIndex + 1;

    if (nextQuestionIndex < quizQuestions.length) {
      setTimeout(() => {
        setCurrentFeedback("");
        setCurrentQuestionIndex(nextQuestionIndex);
      }, 1000);
    } else {
      setIsQuizFinished(true);
      setIsTimerActive(false);
      setCurrentView("result");
    }
  };

  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setUserScore(0);
    setIsQuizFinished(false);
    setCurrentFeedback("");
    setTimeElapsed(0);
    setIsTimerActive(true);
    setUserAnswers([]);
    setCurrentView("quiz");
  };

  const handleViewAnswers = () => setCurrentView("answers");

  const calculatePercentage = () =>
    ((userScore / quizQuestions.length) * 100).toFixed(2);

  const formatTime = () => {
    const minutes = Math.floor(timeElapsed / 60);
    const seconds = timeElapsed % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };

  if (currentView === "quiz") {
    const currentQuestion = quizQuestions[currentQuestionIndex];
    return (
      <div className="quiz-container">
        <h3>{currentQuestion.question}</h3>
        <div>
          {currentQuestion.options.map((option) => (
            <button key={option} onClick={() => handleAnswerSelection(option)}>
              {option}
            </button>
          ))}
        </div>
        {currentFeedback && <p className="feedback">{currentFeedback}</p>}
        <p>Time Elapsed: {formatTime()}</p>
      </div>
    );
  }

  if (currentView === "result") {
    return (
      <div className="result-container">
        <h2>Result:</h2>
        <h3>
          {userScore} of {quizQuestions.length}
        </h3>
        <h4>{calculatePercentage()}%</h4>
        <p>
          <strong>Time Spent:</strong> {formatTime()}
        </p>
        <button onClick={restartQuiz}>Restart Quiz</button>
        <button onClick={handleViewAnswers}>View Answers</button>
      </div>
    );
  }

  if (currentView === "answers") {
    return (
      <div className="answer-page-container">
        <h2>Detailed Answers:</h2>
        <ul className="answer-list">
          {userAnswers.map((answer, index) => (
            <li key={index} className="answer-item">
              <strong>Q{index + 1}:</strong> {answer.question}
              <br />
              <span>
                <strong>Your Answer:</strong> {answer.selectedOption}{" "}
                {answer.isCorrect ? (
                  <span className="correct">(Correct)</span>
                ) : (
                  <span className="incorrect">
                    (Incorrect, Correct Answer: {answer.correctAnswer})
                  </span>
                )}
              </span>
            </li>
          ))}
        </ul>
        <button onClick={restartQuiz}>Restart Quiz</button>
      </div>
    );
  }

  return null;
};

export default QuizApp;