import { useAuth0 } from '@auth0/auth0-react'

export default function AuthButtons() {
  const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0()
  return (
    <span>
      {!isAuthenticated ? (
        <button onClick={() => loginWithRedirect()} className="px-3 py-1 rounded bg-blue-600 text-white">Login</button>
      ) : (
        <>
          <span className="mr-2 text-sm">{user?.name}</span>
          <button onClick={() => logout({ 
            returnTo: window.location.origin + "/yoga-quiz/"
        })} className="px-3 py-1 rounded bg-gray-100">Logout</button>
        </>
      )}
    </span>
  )
}