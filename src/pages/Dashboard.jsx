import NavBar from "../components/NavBar";

import { useContext } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { userProfileNav } from "../navigation/navbar";

function Dashboard({page}) {
  const { id } = useParams();
  const { userContext, setUserContext } = useContext(UserContext);

  return (
    <div>
      <NavBar navLinks={userProfileNav(userContext)} userId={"1"} />
      {
        page
      }
    </div>
  );
}

export default Dashboard;