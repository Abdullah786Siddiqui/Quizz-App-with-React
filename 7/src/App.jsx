import { useState } from "react";
import QuizQuestions from "./QuizzData";

function App() {
  document.body.style.backgroundColor = "whitesmoke";
  const [currentQuestionIndex, setcurrentQuestionIndex] = useState(0);
  const [showQuizz, setshowQuizz] = useState(false);
  const [score, setscore] = useState(0);
  const [selectedAnswers, setselectedAnswers] = useState([]);
  const [checkedQuestions, setCheckedQuestions] = useState([]);

  const handleNext = () => {
    const currentQuestion = QuizQuestions[currentQuestionIndex];

    if (
      !checkedQuestions.includes(currentQuestionIndex) &&
      selectedAnswers[currentQuestionIndex] === currentQuestion.answer
    ) {
      setscore((prevScore) => prevScore + 1);
      setCheckedQuestions((prev) => [...prev, currentQuestionIndex]);
    }

    if (currentQuestionIndex < QuizQuestions.length - 1) {
      setcurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setcurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleChange = (e) => {
    const updatedAnswers = [...selectedAnswers];
    updatedAnswers[currentQuestionIndex] = e.target.value;
    setselectedAnswers(updatedAnswers);
  };

  const handleSubmit = () => {
    let finalScore = 0;
    QuizQuestions.forEach((question, index) => {
      if (selectedAnswers[index] === question.answer) {
        finalScore += 1;
      }
    });
    setscore(finalScore);
    setshowQuizz(true);
  };

  const currentQuestion = QuizQuestions[currentQuestionIndex];

  return (
    <div className="container">
      <h1 className="fs-1 text-center mt-2">Quizz App With React</h1>
      {!showQuizz ? (
        <div className="quizz">
          <div className="Question-div fs-4">{currentQuestion.question}</div>

          <div className="Answer-div fs-4">
            {currentQuestion.options.map((option, index) => (
              <div key={index}>
                <input
                  style={{ cursor: "pointer", transform: "scale(1.5)" }}
                  className="me-3"
                  type="radio"
                  id={option}
                  value={option}
                  name={`quizz-${currentQuestionIndex}`}
                  checked={selectedAnswers[currentQuestionIndex] === option}
                  onChange={handleChange}
                />
                <label style={{ cursor: "pointer" }} htmlFor={option}>
                  {option}
                </label>
              </div>
            ))}
          </div>

          <div className="btn-div mt-3">
            <button
              className="btn btn-danger fw-bold"
              onClick={handlePrevious}
              disabled={currentQuestionIndex === 0}
            >
              Previous
            </button>
            <button
              className="btn btn-primary mx-3 fw-bold"
              onClick={handleNext}
              disabled={currentQuestionIndex === QuizQuestions.length - 1}
            >
              Next
            </button>
            <button className="btn btn-success fw-bold" onClick={handleSubmit}>
              Submit
            </button>
          </div>
        </div>
      ) : (
        <div className="container">
          <div className="Score-box border border-black mt-4">
            <h3 className="text-center mt-1">Congratulations! Your Score</h3>
            <div className="Score text-center fs-1">
              <span className="mx-2">{score}</span> Out of
              <span className="me-3"> {QuizQuestions.length}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
