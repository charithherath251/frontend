import { useEffect, useState } from "react";

import IconButton from "../../components/IconButton";
import OverlayContainer from "../../components/OverlayContainer";
import RightIconRectInput from "../../components/RightIconRectInput";

import axios from "../../utils/axios";

import "./UserLogins.css";
import { toast } from "react-toastify";

function UserLogins() {
  const [newEmployeeFormOverlay, setNewEmployeeFormOverlay] = useState(false);

  const [changeEmployeeScoreOverlay, setChangeEmployeeScoreOverlay] = useState(false);
  const [changeEmployeeScore__name, setChangeEmployeeScore__name] = useState("");
  const [changeEmployeeScore__score, setChangeEmployeeScore__score] = useState(0);
  const [changeEmployeeScore__type, setChangeEmployeeScore__type] = useState("penalty");

  const [newEmployeeFirstName, setNewEmployeeFirstName] = useState("");
  const [newEmployeeLastName, setNewEmployeeLastName] = useState("");
  const [newEmployeeEmail, setNewEmployeeEmail] = useState("");
  const [newEmployeeDepartment, setNewEmployeeDepartment] = useState("");

  const [departmentList, setDepartmentList] = useState([]);


  useEffect(() => {
    axios.get("/department").then((res) => {
      const departments = res.data.map((department) => {
        return { value: department, label: department };
      });
      setNewEmployeeDepartment(departments[0].value);
      setDepartmentList(departments);
    });
  }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    axios.post("/user", {
      firstName: newEmployeeFirstName,
      lastName: newEmployeeLastName,
      email: newEmployeeEmail,
      department: newEmployeeDepartment,
    }).then((res) => {
      toast.success("Employee added successfully");
    }).catch((err) => {
      toast.error("Failed to add employee");
    });
  }

  const handleAddClick = () => {
    setNewEmployeeFormOverlay(true);
  }

  const handleChangeScoreClick = (id, name, score, type) => {
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
            <div className="title">
              <div className="horizontal-container fx-space-between">
                <span>New Employee</span>
              </div>
            </div>

            <form className="form" onSubmit={(e) => handleFormSubmit(e)}>
              <div className="horizontal-container">
                <span>
                  <RightIconRectInput inputLabel="First Name" icon="person" onChange={setNewEmployeeFirstName} required={true} />
                </span>
                <span>
                  <RightIconRectInput inputLabel="Last Name" icon="person" onChange={setNewEmployeeLastName} required={true} />
                </span>
              </div>
              <span>
                <RightIconRectInput inputLabel="Email" icon="email" onChange={setNewEmployeeEmail} required={true} />
              </span>
              <span>
                <RightIconRectInput type="select" options={departmentList} onChange={setNewEmployeeDepartment} inputLabel="Department" icon="person" required={true} />
              </span>

              <div className="horizontal-container fx-end">
                <IconButton iconb="done" content="Submit" bg="green" c="white" />
              </div>
            </form>
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