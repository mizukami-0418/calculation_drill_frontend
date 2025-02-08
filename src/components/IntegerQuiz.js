import { useState } from "react";

export default function IntegerQuiz({ questions }) {
  const [answers, setAnswers] = useState({});
  const [results, setResults] = useState({});

  const handleChange = (index, value) => {
    setAnswers({ ...answers, [index]: value });
  };

  const checkAnswer = async (index, question) => {
    const response = await fetch(
      "http://localhost:8000/calculation/check_answer/",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          number1: question.number1,
          number2: question.number2,
          operator: question.operator,
          user_answer: parseInt(answers[index], 10),
        }),
      }
    );
    const data = await response.json();
    setResults({ ...results, [index]: data.is_correct });
  };

  return (
    <div className="mt-4">
      <h3 className="text-lg font-bold">整数クイズ</h3>
      <ul>
        {questions.map((q, index) => (
          <li key={index} className="mt-2">
            Q{index + 1}: {q.number1} {q.operator} {q.number2} = ?
            <input
              type="number"
              value={answers[index] || ""}
              onChange={(e) => handleChange(index, e.target.value)}
              className="border p-1 mx-2"
            />
            <button
              onClick={() => checkAnswer(index, q)}
              className="bg-blue-500 text-white px-2 py-1 rounded"
            >
              送信
            </button>
            {results[index] !== undefined && (
              <span
                className={results[index] ? "text-green-500" : "text-red-500"}
              >
                {results[index] ? " 正解！" : " 不正解"}
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
