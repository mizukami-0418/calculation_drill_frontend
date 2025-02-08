import React, { useState } from "react";
// import { API_URL } from "../config";
import { BrowserRouter as Link } from "react-router-dom";
import { fetchQuestions } from "../utils/api";
import QuizDisplay from "./QuizDisplay";

const MathQuiz = () => {
  const [settings, setSettings] = useState({
    use_fraction: false,
    digit_type: 1,
    allow_negative: false,
    operator: "+",
    num_questions: 5,
  });
  const [questions, setQuestions] = useState([]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings({
      ...settings,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleFetchQuestions = async () => {
    try {
      const newQuestions = await fetchQuestions(settings);
      setQuestions(newQuestions);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  return (
    <div className="p-5 max-w-lg mx-auto bg-white shadow rounded-lg">
      <h2 className="text-xl font-bold mb-4">数学クイズ設定</h2>
      <label>
        <input
          type="checkbox"
          name="use_fraction"
          checked={settings.use_fraction}
          onChange={handleChange}
        />
        分数を使用する
      </label>
      <br />
      <label>
        桁数:
        <select
          name="digit_type"
          value={settings.digit_type}
          onChange={handleChange}
        >
          <option value={1}>1桁</option>
          <option value={2}>10-20</option>
          <option value={3}>10-50</option>
          <option value={4}>10-99</option>
        </select>
      </label>
      <br />
      <label>
        <input
          type="checkbox"
          name="allow_negative"
          checked={settings.allow_negative}
          onChange={handleChange}
        />
        負の数を許可する
      </label>
      <br />
      <label>
        演算子:
        <select
          name="operator"
          value={settings.operator}
          onChange={handleChange}
        >
          <option value="+">+</option>
          <option value="-">-</option>
          <option value="×">×</option>
          <option value="÷">÷</option>
        </select>
      </label>
      <br />
      <label>
        問題数:
        <input
          type="number"
          name="num_questions"
          value={settings.num_questions}
          min={1}
          max={20}
          onChange={handleChange}
        />
      </label>
      <br />
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
        onClick={handleFetchQuestions}
      >
        クイズを生成
      </button>
      <QuizDisplay questions={questions} />
      <button>
        <Link to="/">Hello World</Link>
      </button>
    </div>
  );
};
// テスト
export default MathQuiz;
