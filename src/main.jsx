import React from 'react'
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import App from './App'
import { Auth0Provider } from '@auth0/auth0-react'
import './index.css'

const isLocalhost = window.location.hostname === "localhost";
const redirectUri = isLocalhost
  ? window.location.origin
  : window.location.origin + '/yoga-quiz/';


ReactDOM.createRoot(document.getElementById('root')).render(
  <Auth0Provider
    domain={import.meta.env.VITE_auth0_domain}
    clientId={import.meta.env.VITE_auth0_client_id}
    authorizationParams={{
      redirect_uri: redirectUri
    }}
  >
    <HashRouter>
  <App />
    </HashRouter>
  </Auth0Provider>
)