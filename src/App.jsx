
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

import Quiz from './pages/Quiz';

import AuthPage from './pages/AuthPage';
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';

import { UserContext } from './context/UserContext';
import EmailVerifForm from './components/EmailVerifForm';
import PoliciesUser from './pages/PoliciesUser';
import UserProfile from './pages/UserProfile';
import Logout from './pages/Logout';

function App() {

  const [userContext, setUserContext] = useState(JSON.parse(sessionStorage.getItem('user')) || { _id: "66f578529c78da1b66fc4563", role: "admin" });

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

            <Route path="/quiz">
              <Route index element={<Dashboard page={<Quiz/>} />} />
            </Route>
            <Route path="/policies">
              <Route index element={<Dashboard page={<PoliciesUser/>} />} />
            </Route>
            <Route path="/logout">
              <Route index element={<Dashboard page={<Logout/>} />} />
            </Route>
            <Route path="/profile">
              <Route index element={<Dashboard page={<UserProfile/>} />} />
            </Route>
            <Route path="/auth">
              <Route index element={<AuthPage formType={<LoginForm />} />} />
              <Route path="login" element={<AuthPage formType={<LoginForm />} />} />
              <Route path="otp" element={<AuthPage formType={<EmailVerifForm />} />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
    </>
  );
}

export default App;
