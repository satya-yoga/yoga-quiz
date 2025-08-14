import React, { useEffect, useState } from 'react'
import QuestionCard from './QuestionCard'

// List your sets here. Add more as needed.
const QUESTION_SETS = [
  { name: 'Set 1', file: 'questions-set-1.json' },
  { name: 'Set 2', file: 'questions-set-2.json' },
  { name: 'Set 3', file: 'questions-set-3.json' },
  { name: 'Set 4', file: 'questions-set-4.json' },
  { name: 'Set 5', file: 'questions-set-5.json' },
  { name: 'Set 6', file: 'questions-set-6.json' },
  { name: 'Set 7', file: 'questions-set-7.json' },
  { name: 'Set 8', file: 'questions-set-8.json' },
  { name: 'Set 9', file: 'questions-set-9.json' },
  { name: 'Set 10', file: 'questions-set-10.json' }

]

// Sidebar component
function Sidebar({ sets, selected, onSelect }) {
  return (
    <div className="w-48 bg-gray-100 h-full p-4 border-r">
      <h2 className="font-bold mb-4">Question Sets</h2>
      <ul className="space-y-2">
        {sets.map(set => (
          <li key={set.file}>
            <button
              className={`w-full text-left px-3 py-2 rounded ${selected === set.file ? 'bg-blue-500 text-white' : 'bg-white text-gray-800'}`}
              onClick={() => onSelect(set.file)}
            >
              {set.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function Quiz() {
  const [setFile, setSetFile] = useState(QUESTION_SETS[0].file)
  const [questions, setQuestions] = useState(null)
  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState({})

  // Load questions for selected set
  useEffect(() => {
    if (!setFile) return
    setQuestions(null)
    setCurrent(0)
    setAnswers({})
    fetch(setFile)
      .then(res => {
        if (!res.ok) throw new Error(`Could not load ${setFile}`)
        return res.json()
      })
      .then(data => setQuestions(data))
      .catch(err => {
        console.error(err)
        setQuestions([])
      })
  }, [setFile])

  // Restore saved answers per set
  useEffect(() => {
    if (!setFile) return
    const saved = localStorage.getItem(`quiz_answers_${setFile}`)
    if (saved) setAnswers(JSON.parse(saved))
  }, [setFile])

  // Save answers per set
  useEffect(() => {
    if (!setFile) return
    localStorage.setItem(`quiz_answers_${setFile}`, JSON.stringify(answers))
  }, [answers, setFile])

  // Layout
  return (
    <div className="flex h-screen">
      <Sidebar
        sets={QUESTION_SETS}
        selected={setFile}
        onSelect={setFile => setSetFile(setFile)}
      />
      <div className="flex-1 flex flex-col items-center justify-center bg-gray-50">
        {questions === null ? (
          <div>Loading questions...</div>
        ) : questions.length === 0 ? (
          <div>No questions found for this set.</div>
        ) : (
          <div className="w-full max-w-xl">
            <div className="flex items-center justify-between mb-4">
              <div className="text-sm text-gray-600">
                {QUESTION_SETS.find(s => s.file === setFile)?.name} — Question {current + 1} / {questions.length}
              </div>
              <div className="w-1/3 bg-gray-200 rounded h-2 overflow-hidden">
                <div
                  className="h-full bg-blue-500"
                  style={{ width: `${((current + 1) / questions.length) * 100}%` }}
                />
              </div>
            </div>
            <QuestionCard
              q={questions[current]}
              qIndex={current}
              savedAnswer={answers[current]}
              onSelect={idx => setAnswers(prev => ({ ...prev, [current]: idx }))}
            />
            <div className="flex justify-between mt-4">
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
          </div>
        )}
      </div>
    </div>
  )
}