import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { HashRouter } from 'react-router-dom';
import './index.css';
import '/node_modules/modern-normalize/modern-normalize.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HashRouter basename="/booker-front-end">
      <App />
    </HashRouter>
  </React.StrictMode>
);
