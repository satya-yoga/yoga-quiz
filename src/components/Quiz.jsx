import React, { useEffect, useState } from 'react'
import QuestionCard from './QuestionCard'

const QUESTION_SETS = [
  { name: 'Set 1', file: 'questions-set-1.json' },
  { name: 'Set 2', file: 'questions-set-2.json' },
  { name: 'Set 3', file: 'questions-set-3.json' },
  // Add more sets as needed
]

export default function Quiz() {
  const [setFile, setSetFile] = useState(QUESTION_SETS[0].file)
  const [questions, setQuestions] = useState(null)
  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState({})

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

  useEffect(() => {
    if (!setFile) return
    const saved = localStorage.getItem(`quiz_answers_${setFile}`)
    if (saved) setAnswers(JSON.parse(saved))
  }, [setFile])

  useEffect(() => {
    if (!setFile) return
    localStorage.setItem(`quiz_answers_${setFile}`, JSON.stringify(answers))
  }, [answers, setFile])

  return (
<div className="h-full flex flex-col items-center bg-gray-50 px-2 py-4">
      <div className="w-full max-w-xl mb-6">
        <label htmlFor="set-select" className="block mb-2 font-semibold text-gray-700">
          Select Question Set
        </label>
        <select
          id="set-select"
          value={setFile}
          onChange={e => setSetFile(e.target.value)}
          className="w-full p-2 border rounded"
        >
          {QUESTION_SETS.map(set => (
            <option key={set.file} value={set.file}>{set.name}</option>
          ))}
        </select>
      </div>
      {questions === null ? (
        <div>Loading questions...</div>
      ) : questions.length === 0 ? (
        <div>No questions found for this set.</div>
      ) : (
        <div className="w-full max-w-xl">
          <div className="flex flex-col md:flex-row items-center justify-between mb-4 gap-2">
            <div className="text-sm text-gray-600 text-center md:text-left">
              {QUESTION_SETS.find(s => s.file === setFile)?.name} — Question {current + 1} / {questions.length}
            </div>
            <div className="w-full md:w-1/3 bg-gray-200 rounded h-2 overflow-hidden">
              <div
                className="h-full bg-blue-500"
                style={{ width: `${((current + 1) / questions.length) * 100}%` }}
              />
            </div>
          </div>
          <div className="flex justify-between mt-4">
            <button
              onClick={() => setCurrent(c => Math.max(0, c - 1))}
              disabled={current === 0}
              className="px-4 py-2 rounded bg-gray-100 disabled:opacity-50"
            >
              Previous
            </button>
            
            <button
              onClick={() => setCurrent(c => Math.min(questions.length - 1, c + 1))}
              disabled={current === questions.length - 1}
              className="px-4 py-2 rounded bg-blue-500 text-white disabled:opacity-50"
            >
              Next
            </button>
          </div>
          <QuestionCard
            q={questions[current]}
            qIndex={current}
            savedAnswer={answers[current]}
            onSelect={idx => setAnswers(prev => ({ ...prev, [current]: idx }))}
          />
          
          <div className="flex flex-col md:flex-row justify-between mt-4 gap-2">
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

          </div>
        </div>
      )}
    </div>
  )
}