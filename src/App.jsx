import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Quiz from './components/Quiz'
import Admin from './components/Admin'
import Resources from './components/Resources'

export default function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <header className="bg-white shadow">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <h1 className="text-xl font-semibold">Yoga Vidya – YCB Exam Practice App</h1>
            <nav className="space-x-2">
              <Link
                to="/yoga-quiz/"
                className="px-3 py-1 rounded bg-gray-100 hover:bg-blue-600 hover:text-white"
              >
                Quiz
              </Link>
              <Link
                to="/yoga-quiz/resources"
                className="px-3 py-1 rounded bg-gray-100 hover:bg-blue-600 hover:text-white"
              >
                Resources
              </Link>
              {/* No Admin button here */}
            </nav>
          </div>
        </header>

        <main className="flex-1 container mx-auto px-4 py-8">
          <Routes>
            <Route path="/yoga-quiz/" element={<Quiz />} />
            <Route path="/yoga-quiz/resources" element={<Resources />} />
            <Route path="/yoga-quiz/admin" element={<Admin />} />
          </Routes>
        </main>

        <footer className="bg-white border-t py-3">
          <div className="container mx-auto text-center text-sm text-gray-600">
            Built with React + Tailwind — free to host on GitHub Pages / Netlify
          </div>
        </footer>
      </div>
    </Router>
  )
}