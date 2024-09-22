// Policy.js
import React, { useEffect, useState } from "react";
import IconButton from "../components/IconButton";
import TextEditor from "../components/TextEditor";

import "./Policy.css";

function Policy() {
    const [text, setText] = useState('This is a sample <h1>policy</h1>. You can edit this <strong>text</strong> to create your own policy.');
    const [editMode, setEditMode] = useState(false);

    useEffect(() => {
        //check if the user has permission to edit


    }, [setEditMode]);

    const handleChange = (value) => {
        setText(value); // Store sanitized HTML in state
    }

    const handleEditButtonClick = () => {
        setEditMode(!editMode);
    }

    const handleSaveButtonClick = () => {
        // Save the policy to the database
        setEditMode(false);
    }

    const handleDeleteButtonClick = () => {
        // Delete the policy from the database
        setEditMode(false);
    }

    return (
        <div className="main-container">
            <div className="container">
                <div className="title">
                    <IconButton iconb="arrow_back" w="40" bg="white" c="black" />
                    Policy Viewer
                </div>
                <hr className="h-divider" />

                <div className="container">
                    <div className="title">
                        <div className="horizontal-container fx-space-between">
                            <span>Policy Name</span>
                            {!editMode && <IconButton iconb="edit" w="40" bg="blue" c="white" onClick={handleEditButtonClick} />}
                            {editMode &&
                                <div className="button-container">
                                    <IconButton iconb="save" w="40" bg="green" c="white" onClick={handleSaveButtonClick} />
                                    <IconButton iconb="cancel" w="40" bg="red" c="white" onClick={handleDeleteButtonClick} />
                                </div>
                            }
                        </div>
                    </div>
                    <hr className="h-divider low-profile" />
                    {
                        !editMode && <div className="policy-content" dangerouslySetInnerHTML={{ __html: text }} />
                    }
                    {
                        editMode && <TextEditor startingText={text} handleChange={handleChange} />
                    }
                </div>
            </div>
        </div>
    );
}

export default Policy;
