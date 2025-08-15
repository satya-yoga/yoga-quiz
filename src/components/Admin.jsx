import React, { useEffect, useState } from 'react'

export default function Admin() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState('');

  const [questions, setQuestions] = useState([])
  const [form, setForm] = useState({
    question: '',
    options: ['', '', '', ''],
    correctIndex: 0,
    description: ''
  })
  const [message, setMessage] = useState('')

  useEffect(() => {
    // Load questions.json initially
    fetch('questions.json')
      .then(res => res.ok ? res.json() : [])
      .then(data => setQuestions(Array.isArray(data) ? data : []))
      .catch(() => setQuestions([]))
  }, [])

  function updateOption(idx, value) {
    setForm(f => {
      const copy = { ...f }
      const ops = [...copy.options]
      ops[idx] = value
      copy.options = ops
      return copy
    })
  }

  function addQuestionToList() {
    if (!form.question.trim() || form.options.some(o => !o.trim())) {
      setMessage('Please fill all fields.')
      return
    }
    const newQ = {
      question: form.question,
      options: form.options,
      correctIndex: Number(form.correctIndex),
      description: form.description
    }
    setQuestions(prev => [...prev, newQ])
    setForm({ question: '', options: ['', '', '', ''], correctIndex: 0, description: '' })
    setMessage('Question added to list. Click "Download JSON" to save.')
  }

  function downloadJSON() {
    const blob = new Blob([JSON.stringify(questions, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'questions.json'
    a.click()
    URL.revokeObjectURL(url)
    setMessage('Downloaded questions.json — replace public/questions.json in your project or upload to your host.')
  }

  function handleFileUpload(e) {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => {
      try {
        const parsed = JSON.parse(ev.target.result)
        if (!Array.isArray(parsed)) throw new Error('Invalid format')
        setQuestions(parsed)
        setMessage('Imported questions.json into admin (in-memory). Click Download to save a file.')
      } catch (err) {
        setMessage('Invalid JSON file.')
      }
    }
    reader.readAsText(file)
  }

  function resetAnswers() {
    localStorage.removeItem('quiz_answers_v1')
    setMessage('Saved answers reset in localStorage.')
  }

  const handleLogin = async () => {
    try {
      const res = await fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        setAuthenticated(true);
      } else {
        const data = await res.json();
        alert(data.message || 'Login failed');
      }
    } catch (err) {
      console.error(err);
      alert('Error connecting to server');
    }
  };

if (!authenticated) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="border p-2 rounded mb-2"
        />
        <button
          onClick={handleLogin}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Login
        </button>
      </div>
    );
  }  

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-semibold mb-2">Add Question</h2>

          <label className="block text-sm font-medium">Question</label>
          <textarea
            value={form.question}
            onChange={(e) => setForm(f => ({ ...f, question: e.target.value }))}
            className="w-full border rounded p-2 mt-1"
          />

          <div className="mt-3 space-y-2">
            {form.options.map((opt, idx) => (
              <div key={idx}>
                <label className="text-sm">Option {idx + 1}</label>
                <input
                  value={opt}
                  onChange={(e) => updateOption(idx, e.target.value)}
                  className="w-full border rounded p-2 mt-1"
                />
              </div>
            ))}
          </div>

          <div className="mt-3 grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm">Correct option (0-based index)</label>
              <input
                type="number"
                min="0"
                max="3"
                value={form.correctIndex}
                onChange={(e) => setForm(f => ({ ...f, correctIndex: Number(e.target.value) }))}
                className="w-full border rounded p-2 mt-1"
              />
            </div>

            <div>
              <label className="text-sm">Description</label>
              <input
                value={form.description}
                onChange={(e) => setForm(f => ({ ...f, description: e.target.value }))}
                className="w-full border rounded p-2 mt-1"
              />
            </div>
          </div>

          <div className="mt-3 flex space-x-2">
            <button onClick={addQuestionToList} className="px-4 py-2 bg-blue-600 text-white rounded">Add to list</button>
            <button onClick={() => { setForm({ question: '', options: ['', '', '', ''], correctIndex: 0, description: '' }) }} className="px-4 py-2 bg-gray-100 rounded">Clear</button>
          </div>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-semibold mb-2">Manage Questions</h2>

          <div className="mb-3">
            <label className="text-sm">Import `questions.json` file</label>
            <input type="file" accept="application/json" onChange={handleFileUpload} className="block mt-2" />
          </div>

          <div className="mb-3">
            <button onClick={downloadJSON} className="px-4 py-2 bg-green-600 text-white rounded">Download JSON</button>
            <button onClick={resetAnswers} className="ml-2 px-4 py-2 bg-yellow-400 rounded">Reset Saved Answers</button>
          </div>

          <div className="max-h-64 overflow-auto border rounded p-2">
            {questions.length === 0 ? (
              <div className="text-gray-500">No questions loaded.</div>
            ) : (
              <ol className="list-decimal pl-5 space-y-2">
                {questions.map((q, i) => (
                  <li key={i}>
                    <div className="font-medium">{q.question}</div>
                    <div className="text-sm text-gray-600">Options: {q.options.join(' • ')}</div>
                    <div className="text-xs text-gray-500">Correct: {q.correctIndex}</div>
                  </li>
                ))}
              </ol>
            )}
          </div>

          {message && <div className="mt-3 text-sm text-blue-600">{message}</div>}
        </div>
      </div>

      <div className="text-sm text-gray-500">
        <strong>Note:</strong> After you click "Download JSON", replace the project's <code>public/questions.json</code> with the downloaded file to have the app serve the updated questions. When deployed, upload the new `questions.json` to your hosting provider (Netlify/GitHub).
      </div>
    </div>
  )
}
