
import './App.css';
import React, { useState } from 'react';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';

import Dashboard from './pages/Dashboard';
import AdminMain from './pages/admin/AdminMain';
import UserLogins from './pages/admin/UserLogins';
import Policies from './pages/admin/Policies';
import Policy from './pages/Policy';
import Quizes from './pages/admin/Quizes';

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
              <Route index element={<Dashboard page={<AdminMain/>}/>} />
              <Route path="logins" element={<Dashboard page={<UserLogins/>}/>} />
              <Route path="policies" element={<Dashboard page={<Policies/>}/>} />
              <Route path="policies/:id" element={<Dashboard page={<Policy/>}/>} />
              <Route path="quizes" element={<Dashboard page={<Quizes/>}/>} />
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
