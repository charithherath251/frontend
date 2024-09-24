// Policy.js
import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

import axios from "../utils/axios";

import IconButton from "../components/IconButton";
import RightIconRectInput from "../components/RightIconRectInput";
import TextEditor from "../components/TextEditor";

import "./Policy.css";

function Policy() {

    const [searchParams] = useSearchParams();
    const { id } = useParams();
    const navigate = useNavigate();

    const isCreateMode = searchParams.get('create') === 'true';
    let isEditMode = searchParams.get('edit') === 'true';

    if (isCreateMode) {
        isEditMode = true;
    }
    const [editMode, setEditMode] = useState(isEditMode);

    const [policy, setPolicy] = useState({ "policyName": "", "department": "", "level": "novice", "policyDescription": "", "policyContent": "", "policyLink": "null", "policyCreatedDate": Date.now() });

    const [policyName, setPolicyName] = useState(policy.policyName);
    const [department, setDepartment] = useState(policy.department);
    const [level, setLevel] = useState(policy.level);
    const [policyDescription, setPolicyDescription] = useState(policy.policyDescription);
    const [policyContent, setPolicyContent] = useState(policy.policyContent);
    const [policyLink, setPolicyLink] = useState(policy.policyLink);
    const [policyCreatedDate, setPolicyCreatedDate] = useState(policy.policyCreatedDate);

    const [backupText, setBackupText] = useState(policy.policyContent);

    useEffect(() => {
        const fetchData = async () => {
            setEditMode(isEditMode);
            let res = await axios.get(`/policy/${id}`);
            setPolicy(res.data);
        }
        if (!isCreateMode) {
            fetchData();
        }
    }, []);

    useEffect(() => {
        setPolicyName(policy.policyName);
        setDepartment(policy.department);
        setLevel(policy.level);
        setPolicyDescription(policy.policyDescription);
        setPolicyContent(policy.policyContent);
        setPolicyLink(policy.policyLink);
        setPolicyCreatedDate(policy.policyCreatedDate);
    }, [policy]);


    const handleChange = (value) => {
        setPolicyContent(value); // Store sanitized HTML in state
    }

    const handleEditButtonClick = () => {
        setBackupText(policyContent);
        setEditMode(!editMode);
    }

    const handleSaveButtonClick = () => {
        // Save the policy to the database

        if(!policyName || !department || !level || !policyDescription || !policyContent || !policyLink || !policyCreatedDate) {
            toast.error("Please fill all the fields");
            return;
        }

        if (isCreateMode) {
            axios.post('/policy', {
                policyName: policyName,
                department: department,
                level: level,
                policyDescription: policyDescription,
                policyContent: policyContent,
                policyLink: policyLink,
                policyCreatedDate: policyCreatedDate
            }).then((res) => {
                toast.success("Policy created successfully");
                setPolicy(res.data);
                navigate(`/admin/policies/${res.data._id}`);
            }).catch((err) => {
                toast.error("Failed to create policy");
            });
        } else {
            axios.put(`/policy/${id}`, {
                policyName: policyName,
                department: department,
                level: level,
                policyDescription: policyDescription,
                policyContent: policyContent,
                policyLink: policyLink,
                policyCreatedDate: policyCreatedDate
            }).then((res) => {
                toast.success("Policy updated successfully");
                setPolicy(res.data);
            }).catch((err) => {
                toast.error("Failed to update policy");
            });
        }
        
        setEditMode(false);
    }

    const handleDeleteButtonClick = () => {
        // Delete the policy from the database
        if (isCreateMode) {
            navigate(-1);
            return;
        }

        setPolicyContent(backupText);
        setEditMode(false);
    }

    const handleBack = () => {
        navigate(-1);
    }

    return (
        <div className="main-container">
            <form onSubmit={(e) => e.preventDefault()}>
            <div className="container">
                <div className="title">
                    <div className="horizontal-container justify-flex-start">
                        <IconButton iconb="arrow_back" w="40" bg="white" c="black" onClick={handleBack} />
                        Policy Viewer
                    </div>
                </div>
                <hr className="h-divider" />

                <div className="container">
                    <div className="title">
                        <div className="horizontal-container fx-space-between">
                            {editMode ?
                                <>
                                    <span>
                                        <RightIconRectInput inputLabel="Policy Name" icon="person" required={true} value={policy.policyName} onChange={setPolicyName} />
                                    </span>
                                    <span>
                                        <RightIconRectInput inputLabel="Department" icon="person" required={true} value={policy.department} onChange={setDepartment} />
                                    </span>
                                    <span>
                                        <RightIconRectInput inputLabel="Level" icon="person" required={true} value={policy.level} onChange={setLevel} />
                                    </span>
                                </>
                                : <h2>{policy.policyName}</h2>
                            }

                            {!editMode && <IconButton iconb="edit" w="40" bg="blue" c="white" onClick={handleEditButtonClick} />}
                            {editMode &&
                                <div className="button-container">
                                    <IconButton type="submit" iconb="save" w="40" bg="green" c="white" onClick={handleSaveButtonClick} />
                                    <IconButton iconb="cancel" w="40" bg="red" c="white" onClick={handleDeleteButtonClick} />
                                </div>
                            }
                        </div>
                        <div className="horizontal-container justify-flex-start">
                            {editMode ?
                                <div className="full-width">
                                    <RightIconRectInput inputLabel="Policy Description" icon="person" required={true} value={policy.policyDescription} onChange={setPolicyDescription} />
                                </div> :
                                <h3>Description : {policy.policyDescription}</h3>
                            }
                        </div>
                    </div>
                    <hr className="h-divider low-profile" />
                    {
                        !editMode && <div className="policy-content" dangerouslySetInnerHTML={{ __html: policy.policyContent }} />
                    }
                    {
                        editMode && <TextEditor startingText={policy.policyContent} handleChange={handleChange} />
                    }
                </div>
            </div>
            </form>
        </div>
    );
}

export default Policy;
