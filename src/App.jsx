
import './App.css';
import React, { useState } from 'react';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';

import AdminDashboard from './pages/AdminDashboard';
import { UserContext } from './context/UserContext';


function App() {

  const [userContext, setUserContext] = useState(JSON.parse(sessionStorage.getItem('user')) || { _id: "1", role: "user" });

  return (
    <>
      <UserContext.Provider value={{ userContext, setUserContext }}>
        <BrowserRouter>
          <Routes>
            <Route exact path="/dashboard" element={<AdminDashboard />} />
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
    </>
  );
}

export default App;
