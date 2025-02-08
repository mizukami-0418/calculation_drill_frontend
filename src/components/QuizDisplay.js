import IntegerQuiz from "./IntegerQuiz";
import FractionQuiz from "./FractionQuiz";

export default function QuizDisplay({ questions }) {
  if (questions.length === 0) {
    return <p className="text-gray-500">クイズを生成してください。</p>;
  }

  // 整数のクイズと分数のクイズを分類
  const integerQuestions = questions.filter((q) => "number1" in q);
  const fractionQuestions = questions.filter((q) => "numerator1" in q);

  return (
    <div className="mt-4">
      {integerQuestions.length > 0 && (
        <IntegerQuiz questions={integerQuestions} />
      )}
      {fractionQuestions.length > 0 && (
        <FractionQuiz questions={fractionQuestions} />
      )}
    </div>
  );
}
