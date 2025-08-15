export default function QuestionCard({ q, qIndex, savedAnswer, onSelect }) {
  if (!q) return null
  return (
    <div className="bg-white rounded shadow p-4 md:p-6 w-full">
      <div className="text-lg font-medium mb-4">Question {qIndex + 1}</div>
      <div className="mb-4 text-gray-800">{q.question}</div>
      <div className="grid gap-3">
        {q.options.map((opt, idx) => {
          const isSelected = savedAnswer === idx
          return (
            <button
              key={idx}
              className={`p-3 rounded text-left border w-full transition ${
                isSelected ? 'bg-blue-100 border-blue-500' : 'bg-gray-50 border-gray-200'
              }`}
              onClick={() => onSelect(idx)}
            >
              {opt}
            </button>
          )
        })}
      </div>
      {savedAnswer != null && (
        <div className="mt-4 p-3 bg-gray-50 rounded">
          <div className="text-sm text-gray-700">{q.description}</div>
        </div>
      )}
    </div>
  )
}