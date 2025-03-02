import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { BrowserRouter, Router } from 'react-router-dom'
import { AppRouter } from './routes/AppRouter';
import Header from './components/Header';
import { UserProvider } from './util/UserContext';
import { ToastContainer } from 'react-toastify';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const backendBaseUrl = "https://dev-guild.onrender.com"; // バックエンドのURL

root.render(
  <React.StrictMode>
    <BrowserRouter basename={backendBaseUrl}>
      <UserProvider>
        <Header />
        <AppRouter />
        <ToastContainer />
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
