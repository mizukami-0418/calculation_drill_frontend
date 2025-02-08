import { useState } from "react";

export default function FractionQuiz({ questions }) {
  const [answers, setAnswers] = useState({});
  const [results, setResults] = useState({});

  const handleChange = (index, field, value) => {
    setAnswers({
      ...answers,
      [index]: { ...answers[index], [field]: value },
    });
  };

  const checkAnswer = async (index, question) => {
    const response = await fetch(
      "http://localhost:8000/calculation/check_answer/",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          numerator1: question.numerator1,
          denominator1: question.denominator1,
          numerator2: question.numerator2,
          denominator2: question.denominator2,
          operator: question.operator,
          user_numerator: parseInt(answers[index]?.numerator, 10),
          user_denominator: parseInt(answers[index]?.denominator, 10),
        }),
      }
    );
    const data = await response.json();
    setResults({ ...results, [index]: data.is_correct });
  };

  return (
    <div className="mt-4">
      <h3 className="text-lg font-bold">分数クイズ</h3>
      <ul>
        {questions.map((q, index) => (
          <li key={index} className="mt-2">
            Q{index + 1}: ({q.numerator1}/{q.denominator1}) {q.operator} (
            {q.numerator2}/{q.denominator2}) = ?
            <input
              type="number"
              placeholder="分子"
              value={answers[index]?.numerator || ""}
              onChange={(e) => handleChange(index, "numerator", e.target.value)}
              className="border p-1 mx-2"
            />
            /
            <input
              type="number"
              placeholder="分母"
              value={answers[index]?.denominator || ""}
              onChange={(e) =>
                handleChange(index, "denominator", e.target.value)
              }
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
