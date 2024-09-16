import NavBar from "../components/NavBar";

import { useContext } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { userProfileNav } from "../navigation/navbar";

function Dashboard() {
  const { id } = useParams();
  const { userContext, setUserContext } = useContext(UserContext);

  return (
    <div>
      <NavBar navLinks={userProfileNav(userContext)} userId={"1"} />
      <div className="main-container">
        <div className="container">
          <h1>Admin Dashboard</h1>
          <p>Welcome to the admin dashboard.</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;