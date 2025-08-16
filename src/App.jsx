import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Quiz from './components/Quiz'
import Admin from './components/Admin'
import Resources from './components/Resources'
import RequireAuth from './components/RequireAuth'
import AuthButtons from './components/AuthButtons'

export default function App() {
  return (
    <Router>
      <div className="h-screen flex flex-col bg-gray-50">
        <header className="bg-white shadow">
          <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between">
            <h1 className="text-xl font-semibold mb-2 md:mb-0 text-center md:text-left">Yoga Vidya – YCB Exam Practice App</h1>
            <nav className="space-x-2 flex flex-wrap justify-center">
              <Link
                to="/"
                className="px-3 py-1 rounded bg-gray-100 hover:bg-blue-600 hover:text-white"
              >
                Quiz
              </Link>
              <Link
                to="/resources"
                className="px-3 py-1 rounded bg-gray-100 hover:bg-blue-600 hover:text-white"
              >
                Resources
              </Link>
              <AuthButtons/>
            </nav>
          </div>
        </header>

        <main className="flex-1 container mx-auto px-2 py-4 overflow-auto">
          <RequireAuth>
            <Routes>
              <Route path="/" element={<Quiz />} />
              <Route path="/resources" element={<Resources />} />
              <Route path="/admin" element={<Admin />} />
            </Routes>
            </RequireAuth>
        </main>

        {/* <footer className="bg-white border-t py-3">
          <div className="container mx-auto text-center text-sm text-gray-600 px-2">
            Built with React + Tailwind — free to host on GitHub Pages / Netlify
          </div>
        </footer> */}
      </div>
    </Router>
  )
}