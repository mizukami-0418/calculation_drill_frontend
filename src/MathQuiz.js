import { useState } from "react";
import { API_URL } from "./config";

export default function MathQuiz() {
  const [settings, setSettings] = useState({
    useFraction: false,
    digitType: 1,
    allowNegative: false,
    operator: "+",
    numQuestions: 5,
  });
  const [questions, setQuestions] = useState([]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings({
      ...settings,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const fetchQuestions = async () => {
    const response = await fetch(`${API_URL}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(settings),
    });
    const data = await response.json();
    setQuestions(data.questions);
  };

  return (
    <div className="p-5 max-w-lg mx-auto bg-white shadow rounded-lg">
      <h2 className="text-xl font-bold mb-4">数学クイズ設定</h2>
      <label>
        <input
          type="checkbox"
          name="useFraction"
          checked={settings.useFraction}
          onChange={handleChange}
        />
        分数を使用する
      </label>
      <br />
      <label>
        桁数:
        <select
          name="digitType"
          value={settings.digitType}
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
          name="allowNegative"
          checked={settings.allowNegative}
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
          name="numQuestions"
          value={settings.numQuestions}
          min={1}
          max={20}
          onChange={handleChange}
        />
      </label>
      <br />
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
        onClick={fetchQuestions}
      >
        クイズを生成
      </button>
      <div className="mt-4">
        {questions.length > 0 && (
          <h3 className="text-lg font-bold">生成されたクイズ:</h3>
        )}
        <ul>
          {questions.map((q, index) => (
            <li key={index} className="mt-2">
              Q{index + 1}: {JSON.stringify(q)}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
// テスト
