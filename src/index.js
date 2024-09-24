import React from 'react';
import ReactDOM from 'react-dom/client';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import './index.css';
import './css/index.css';
import './css/theme.css';
import './css/tailwind-override.css';

import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <ToastContainer position="top-right" autoClose={5000} limit={3} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="colored" />
    <App />
  </>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
