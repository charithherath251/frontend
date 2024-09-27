import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

// import IconButton from "../../components/IconButton";
import axios from "../utils/axios";
import { toast } from "react-toastify";
import { Warning } from "postcss";

function PoliciesUser() {

    const navigate = useNavigate();
    const [userContext, setUserContext] = useState(JSON.parse(sessionStorage.getItem('user')));

    console.log(userContext);
    const [data, setData] = useState([]);

    useEffect(() => {
        // Fetch data
        const fetchData = async () => {
            let res = await axios.get(`/policy/department/${userContext.department}`);
            setData(res.data);
        }
        fetchData();
    }, []);

    
    // const handleViewClick = (id) => {
    //     navigate(`/admin/policies/${id}`);
    // }

    // const handleAddClick = (id) => {
    //     navigate(`/admin/policies/${id}?edit=true&create=true`);
    // }

    // const handleDeleteClick = async (id) => {
    //     //ask user for confirmation
    //     const confirmed = window.confirm("Are you sure you want to delete this policy?");
    //     if (!confirmed) {
    //         return;
    //     }

    //     let res = await axios.delete(`/policy/${id}`);
    //     if (res.status === 200) {
    //         let newData = data.filter(item => item._id !== id);
    //         toast.success("Policy deleted successfully");
    //         setData(newData);
    //     }else{
    //         toast.error("Failed to delete");
    //     }
    // }
    function stripHTMLTags(html) {
        // Use regex to remove all HTML tags
        return html.replace(/<[^>]+>/g, '');
      }
    return (
        <UserContext.Provider value={{ userContext, setUserContext }}>
        <div className="main-container">
            <div className="container">
                <div className="title">
                    <div className="horizontal-container fx-space-between">
                        <h2>Policies</h2>
                        {/* <IconButton iconb="add" w="40" bg="green" c="white" onClick={() => handleAddClick("new")}/> */}
                    </div>
                </div>
                <table className="table table-auto">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Department</th>
                            {/* <th>Level</th> */}
                            <th>Description</th>
                            {/* <th>Date</th> */}
                            <th>policy Content</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data && data.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{item.policyName}</td>
                                        <td>{item.department}</td>
                                        {/* <td>{item.level}</td> */}
                                        <td>{item.policyDescription}</td>
                                        <td>{stripHTMLTags(item.policyContent)}</td>
                                        {/* <td className="td-horizontal">
                                            <IconButton iconb="list_alt" w="40" bg="blue" c="white" onClick={() => handleViewClick(item._id)}/>
                                            <IconButton iconb="delete" w="40" bg="red" c="white" onClick={()=> handleDeleteClick(item._id)}/>
                                        </td> */}
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
        
    </UserContext.Provider>
    );
}

export default PoliciesUser;