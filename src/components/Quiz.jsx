import React, { useEffect, useState } from 'react'
import QuestionCard from './QuestionCard'

export default function Quiz() {
  const [questions, setQuestions] = useState(null)
  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState({}) // {index: selectedIndex}

  useEffect(() => {
    // load questions.json placed in public/
    fetch('questions.json')
      .then(res => {
        if (!res.ok) throw new Error('Could not load questions.json')
        return res.json()
      })
      .then(data => setQuestions(data))
      .catch(err => {
        console.error(err)
        setQuestions([])
      })
  }, [])

  useEffect(() => {
    // restore saved answers (persist across sessions)
    const saved = localStorage.getItem('quiz_answers_v1')
    if (saved) setAnswers(JSON.parse(saved))
  }, [])

  useEffect(() => {
    localStorage.setItem('quiz_answers_v1', JSON.stringify(answers))
  }, [answers])

  if (questions === null) return <div>Loading questions...</div>
  if (questions.length === 0) return <div className="text-center text-gray-600">No questions found. Go to Admin and add or upload questions.</div>

  const q = questions[current]
  const saved = answers[current]

  function handleSelect(idx) {
    setAnswers(prev => ({ ...prev, [current]: idx }))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-600">Question {current + 1} / {questions.length}</div>
        <div className="w-1/3 bg-gray-200 rounded h-2 overflow-hidden">
          <div
            className="h-full bg-blue-500"
            style={{ width: `${((current + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      <QuestionCard q={q} qIndex={current} savedAnswer={saved} onSelect={handleSelect} />

      <div className="flex justify-between">
        <button
          onClick={() => setCurrent(c => Math.max(0, c - 1))}
          disabled={current === 0}
          className="px-4 py-2 rounded bg-gray-100 disabled:opacity-50"
        >
          Previous
        </button>

        <div className="space-x-2">
          <button
            onClick={() => {
              // mark cleared (remove answer)
              setAnswers(prev => {
                const copy = { ...prev }
                delete copy[current]
                return copy
              })
            }}
            className="px-4 py-2 rounded bg-yellow-100"
          >
            Clear answer
          </button>

          <button
            onClick={() => setCurrent(c => Math.min(questions.length - 1, c + 1))}
            disabled={current === questions.length - 1}
            className="px-4 py-2 rounded bg-blue-600 text-white disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>

      {/* <div className="text-sm text-gray-500">
        Answers persist automatically in your browser (localStorage). To reset all answers, clear local storage or open Admin → Reset.
      </div> */}

    </div>
  )
}
