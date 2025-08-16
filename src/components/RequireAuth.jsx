import { useAuth0 } from '@auth0/auth0-react'

export default function RequireAuth({ children }) {
  const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0()

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-lg text-gray-500">Loading...</div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <button
          onClick={() => loginWithRedirect({ redirectUri: window.location.origin + "/yoga-quiz/"})}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Login to access the app
        </button>
      </div>
    )
  }
  return children
}