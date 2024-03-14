import "./App.css";
import { useEffect, useState } from "react";

function App() {
  //TODO: add points system / turn into a game?
  const [value1, setValue1] = useState(0);
  const [value2, setValue2] = useState(0);
  const [operation, setOperation] = useState("+");
  const [answer, setAnswer] = useState("");
  const [message, setMessage] = useState("Type in your answer.");

  const generateRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const getRandomOperation = () => {
    const operations = ["+", "-", "*", "/"];
    const randomIndex = generateRandomInt(0, operations.length - 1);
    return operations[randomIndex];
  };

  const reset = () => {
    setAnswer("");
    setValue1(generateRandomInt(1, 100));
    setValue2(generateRandomInt(1, 100));
    setOperation(getRandomOperation());
  };

  const checkAnswer = (event) => {
    event.preventDefault();
    const userAnswer = parseFloat(answer);

    if (isNaN(userAnswer)) {
      setMessage("Please enter a valid number.");
      return;
    }

    const correctAnswer = calculateAnswer(value1, value2, operation);
    const roundedCorrectAnswer = Math.round(correctAnswer * 100) / 100;

    if (userAnswer === roundedCorrectAnswer) {
      setMessage("Correct!");
      reset();
    } else {
      setMessage(`Incorrect! The correct answer is ${roundedCorrectAnswer}.`);
    }
  };

  const calculateAnswer = (a, b, op) => {
    switch (op) {
      case "+":
        return a + b;
      case "-":
        return a - b;
      case "*":
        return a * b;
      case "/":
        return a / b;
      default:
        return 0;
    }
  };

  useEffect(() => {
    reset();
  }, []);

  return (
    <div className="w-screen h-screen space-y-4 flex flex-col items-center justify-center bg-gradient-to-r from-cyan-500 to-blue-500">
      <section className="w-full text-center">
        <h1 className="text-3xl font-semibold text-white">Math Quiz</h1>
      </section>
      <section className="bg-white rounded w-1/2 py-3 flex items-center justify-center">
        <div className="space-y-2 flex flex-col items-center justify-center">
          <span>{value1}</span>
          <span>{operation}</span>
          <span>{value2}</span>
          <span className="w-24 border-b-2 border-black"></span>
          <form onSubmit={checkAnswer}>
            <input
              onChange={(event) => setAnswer(event.target.value)}
              className="text-center border-black w-24 bg-gray-100"
              type="text"
              value={answer}
            />
          </form>
          <h3
            className={`text-base ${
              message.includes("Correct!")
                ? "text-green-500"
                : message.includes("Incorrect!")
                ? "text-red-500"
                : ""
            }`}
          >
            {message}
          </h3>
        </div>
      </section>
    </div>
  );
}

export default App;
