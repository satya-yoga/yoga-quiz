import React from 'react'

export default function QuestionCard({ q, qIndex, savedAnswer, onSelect }) {
  return (
    <div className="bg-white rounded shadow p-6">
      <div className="text-lg font-medium mb-4">Question {qIndex + 1}</div>
      <div className="mb-4 text-gray-800">{q.question}</div>

      <div className="grid gap-3">
        {q.options.map((opt, idx) => {
          const isSelected = savedAnswer === idx
          const isCorrect = q.correctIndex === idx
          const btnBase = "p-3 rounded text-left border w-full"
          let classes = btnBase + " bg-gray-50 border-gray-200"
          if (savedAnswer != null) {
            if (isCorrect) classes = btnBase + " bg-green-100 border-green-400"
            else if (isSelected && !isCorrect) classes = btnBase + " bg-red-100 border-red-400"
          } else if (isSelected) {
            classes = btnBase + " bg-blue-50 border-blue-300"
          }
          return (
            <button
              key={idx}
              onClick={() => onSelect(idx)}
              className={classes}
              aria-pressed={isSelected}
            >
              <span className="font-medium mr-2"> {String.fromCharCode(65 + idx)}.</span>
              <span>{opt}</span>
            </button>
          )
        })}
      </div>

      {/* description appears only after an answer is selected */}
      {savedAnswer != null && (
        <div className="mt-4 p-3 bg-gray-50 rounded">
          <div className="text-sm text-gray-700">{q.description}</div>
        </div>
      )}
    </div>
  )
}
