
import './App.css';
import { Route, Router, Routes } from 'react-router-dom';
import Sidebar from './components/SideBar';
import Home from './pages/Home';
import PolicyPage from './components/PoliciesPage';

function App() {
  return (
    <>
      
        <Routes>
          <Route exact path="/" element={<Sidebar/>} />
          <Route path='/home' element={<Home/>} /> 
          <Route path='/policies' element={<PolicyPage/>} />
        </Routes>
    </>
  );
}

export default App;
