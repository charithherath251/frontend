
import './App.css';
import { Route, Router, Routes } from 'react-router-dom';
import Sidebar from './components/SideBar';
import Home from './pages/Home';
import PolicyPage from './components/PoliciesPage';
import Login from './pages/Login';


function App() {
  return (
    <>
      
        <Routes>
          <Route exact path="/" element={<Sidebar/>} />
          <Route path='/home' element={<Home/>} /> 
          <Route path='/policies' element={<PolicyPage/>} />
          <Route path='/login' element={<Login/>} />
        </Routes>
    </>
  );
}

export default App;
