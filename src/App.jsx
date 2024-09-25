
import './App.css';
import React, { useState } from 'react';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';

import ProtectedRoute from './helpers/ProtectedRoute';

import Dashboard from './pages/Dashboard';
import AdminMain from './pages/admin/AdminMain';
import UserLogins from './pages/admin/UserLogins';
import Policies from './pages/admin/Policies';
import Policy from './pages/Policy';
import MCQs from './pages/admin/MCQs';

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
              <Route index element={
                <ProtectedRoute>
                  <Dashboard page={
                    <AdminMain />
                  } />
                </ProtectedRoute>
              } />

              <Route path="logins" element={
                <ProtectedRoute>
                  <Dashboard page={<UserLogins />} />
                </ProtectedRoute>
              } />
              <Route path="policies" element={
                <ProtectedRoute>
                  <Dashboard page={<Policies />} />
                </ProtectedRoute>
              } />
              <Route path="policies/:id" element={
                <ProtectedRoute>
                  <Dashboard page={<Policy />} />
                </ProtectedRoute>
              } />
              <Route path="mcqs" element={
                <ProtectedRoute>
                  <Dashboard page={<MCQs />} />
                </ProtectedRoute>
              } />
            </Route>

            <Route path="/auth">
              <Route index element={<AuthPage formType={<LoginForm />} />} />
              <Route path="login" element={<AuthPage formType={<LoginForm />} />} />
              <Route path="register" element={<AuthPage formType={<RegisterForm />} />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
    </>
  );
}

export default App;
