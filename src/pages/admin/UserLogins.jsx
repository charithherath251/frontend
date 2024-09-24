import { useState } from "react";

import IconButton from "../../components/IconButton";
import OverlayContainer from "../../components/OverlayContainer";
import RightIconRectInput from "../../components/RightIconRectInput";

import "./UserLogins.css";

function UserLogins() {
  const [newEmployeeFormOverlay, setNewEmployeeFormOverlay] = useState(false);

  const [changeEmployeeScoreOverlay, setChangeEmployeeScoreOverlay] = useState(false);
  const [changeEmployeeScore__name, setChangeEmployeeScore__name] = useState("");
  const [changeEmployeeScore__score, setChangeEmployeeScore__score] = useState(0);
  const [changeEmployeeScore__type, setChangeEmployeeScore__type] = useState("penalty");


  const handleAddClick = () => {
    console.log("Add clicked");
    setNewEmployeeFormOverlay(true);
  }

  const handleChangeScoreClick = (id, name, score, type) => {
    console.log("Change score clicked");
    setChangeEmployeeScoreOverlay(true);
    setChangeEmployeeScore__name(name);
    setChangeEmployeeScore__score(score);
    setChangeEmployeeScore__type(type);
  }

  const capitalize = (s) => {
    return s[0].toUpperCase() + s.slice(1);
  }

  return (
    <div className="main-container">
      {newEmployeeFormOverlay &&
        <OverlayContainer display={setNewEmployeeFormOverlay}>
          <div className="container">

            <RightIconRectInput inputLabel="Employee ID" icon="person" required={true} />
            <RightIconRectInput inputLabel="Email" icon="person" required={true} />
            <RightIconRectInput inputLabel="Employee Name" icon="person" required={true} />
            <RightIconRectInput inputLabel="Department" icon="person" required={true} />
            <RightIconRectInput inputLabel="Role" icon="person" required={true} />
            <RightIconRectInput inputLabel="Employee ID" icon="person" required={true} />
            <RightIconRectInput inputLabel="Email" icon="person" required={true} />
            <RightIconRectInput inputLabel="Employee Name" icon="person" required={true} />
            <RightIconRectInput inputLabel="Department" icon="person" required={true} />
            <RightIconRectInput inputLabel="Role" icon="person" required={true} />

            <div className="horizontal-container fx-end">
              <IconButton iconb="done" w="40" bg="green" c="white" />
            </div>
          </div>
        </OverlayContainer>
      }

      {changeEmployeeScoreOverlay &&
        <OverlayContainer display={setChangeEmployeeScoreOverlay}>
          <div className="container">
            <div className="title">
              <div className="horizontal-container fx-space-between">
                <span>{changeEmployeeScore__name}</span>
                <span className={changeEmployeeScore__type}>{changeEmployeeScore__type.toLocaleUpperCase()}</span>
                <span>Current Score: {changeEmployeeScore__score}</span>
              </div>
            </div>

            <RightIconRectInput inputLabel={capitalize(changeEmployeeScore__type)} icon="person" required={true} />
            <RightIconRectInput inputLabel="Reason" icon="person" required={true} />

            <IconButton iconb="done" content="Done" bg="green" c="white" />
          </div>
        </OverlayContainer>
      }
      <div className="container">
        <div className="title">
          <div className="horizontal-container fx-space-between">
            <span>Employee Logins</span>
            <IconButton iconb="add" w="40" bg="green" c="white" onClick={() => handleAddClick()} />
          </div>
        </div>

        <table className="table table-auto">
          <thead>
            <tr>
              <th>Employee ID</th>
              <th>Employee Name</th>
              <th>Department</th>
              <th>Role</th>
              <th>Last Login</th>
              <th>Level</th>
              <th>Marks</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Employee 1</td>
              <td>Department 1</td>
              <td>Role 1</td>
              <td>Last Login 1</td>
              <td>Level 1</td>
              <td>Marks 1</td>
              <td className="td-horizontal">
                <IconButton iconb="star_rate" w="40" bg="green" c="white" title="Reward" onClick={(e) => handleChangeScoreClick(1, "employee1", 100, "reward")} />
                <IconButton iconb="yellow_card" w="40" bg="yellow" c="white" title="Penalty" onClick={(e) => handleChangeScoreClick(1, "employee1", 100, "penalty")} />
                <IconButton iconb="delete" w="40" bg="red" c="white" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UserLogins;