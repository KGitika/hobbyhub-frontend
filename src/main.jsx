import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import './index.css';

//Use basename only in production (GitHub Pages). Local dev stays "/".
const basename = import.meta.env.PROD ? '/hobbyhub-frontend' : '/';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode basename={basename}>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
