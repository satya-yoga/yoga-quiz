import React, { useState, useEffect } from 'react'
import Quiz from './components/Quiz'
import Admin from './components/Admin'

export default function App() {
  const [mode, setMode] = useState('quiz') // 'quiz' or 'admin'
  useEffect(() => {
    document.title = "Yoga Vidya"
  }, [])

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white shadow">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-semibold">Yoga Vidya – YCB Exam Practice App</h1>
          <nav className="space-x-2">
            <button
              onClick={() => setMode('quiz')}
              className={`px-3 py-1 rounded ${mode==='quiz' ? 'bg-blue-600 text-white' : 'bg-gray-100'}`}
            >
              Quiz
            </button>
            <button
              onClick={() => setMode('admin')}
              className={`px-3 py-1 rounded ${mode==='admin' ? 'bg-blue-600 text-white' : 'bg-gray-100'}`}
            >
              Admin
            </button>
          </nav>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8">
        {mode === 'quiz' ? <Quiz /> : <Admin />}
      </main>

      <footer className="bg-white border-t py-3">
        <div className="container mx-auto text-center text-sm text-gray-600">
          Built with React + Tailwind — free to host on GitHub Pages / Netlify
        </div>
      </footer>
    </div>
  )
}
