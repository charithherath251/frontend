import React from 'react';
import { Link } from 'react-router-dom';


const Sidebar = () => {
  return (
    <div className="h-screen w-64 bg-gray-800 text-white">
      <h2 className="text-center text-xl font-bold py-4">InfoSec Dashboard</h2>
      <ul className="mt-10">
        <li className="py-2 px-4 hover:bg-gray-700"><Link to="/">Dashboard</Link></li>
        <li className="py-2 px-4 hover:bg-gray-700"><Link to="/policies">Policies</Link></li>
        <li className="py-2 px-4 hover:bg-gray-700"><Link to="/users">User Access</Link></li>
        <li className="py-2 px-4 hover:bg-gray-700"><Link to="/incidents">Incident Reports</Link></li>
        <li className="py-2 px-4 hover:bg-gray-700"><Link to="/logs">Audit Logs</Link></li>
        <li className="py-2 px-4 hover:bg-gray-700"><Link to="/alerts">Alerts</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;
