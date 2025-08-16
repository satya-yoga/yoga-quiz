import React from 'react'
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import App from './App'
import { Auth0Provider } from '@auth0/auth0-react'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Auth0Provider
    domain="dev-77raroh2pqqzgq5q.us.auth0.com"
    clientId="0m67807HFpM4PoSwjmhLYunat9IJvnjM"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >
    <App />
  </Auth0Provider>
)