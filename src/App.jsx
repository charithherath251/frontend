
import './App.css';
import React, { useState } from 'react';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';

import AdminDashboard from './pages/AdminDashboard';
import AuthPage from './pages/AuthPage';
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';

import { UserContext } from './context/UserContext';


function App() {

  const [userContext, setUserContext] = useState(JSON.parse(sessionStorage.getItem('user')) || { _id: "1", role: "admin" });

  return (
    <>
      <UserContext.Provider value={{ userContext, setUserContext }}>
        <BrowserRouter>
          <Routes>
            <Route path="/admin">
              <Route index element={<AdminDashboard />} />
              <Route path="logins" element={<AdminDashboard />} />
              <Route path="policies" element={<AdminDashboard />} />
              <Route path="quizes" element={<AdminDashboard />} />
            </Route>
            <Route path="/auth">
              <Route index element={<AuthPage formType={<LoginForm/>}/>} />
              <Route path="login" element={<AuthPage formType={<LoginForm/>}/>} />
              <Route path="register" element={<AuthPage formType={<RegisterForm/>}/>} />
            </Route>
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
    </>
  );
}

export default App;
