import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import axios from "../../utils/axios";

import IconButton from "../../components/IconButton";

import "./MCQs.css";
import TextEditor from "../../components/TextEditor";
import OverlayContainer from "../../components/OverlayContainer";
import RightIconRectInput from "../../components/RightIconRectInput";

function MCQs() {

    const navigate = useNavigate();

    const [displayAddMCQOverlay, setDisplayAddMCQOverlay] = useState(false);

    const [policies, setPolicies] = useState([{ _id: "1", policyName: "Fake Policy" }]);
    const [MCQs, setMCQs] = useState([]);
    const [editMode, setEditMode] = useState(false);

    // Add MCQ
    const [newQuestion, setNewQuestion] = useState("");
    const [options, setOptions] = useState(["", "", "", "", ""]);
    const [correctAnswer, setCorrectAnswer] = useState(-1);
    const [relatedPolicy, setRelatedPolicy] = useState("");
    const [mcqId, setMCQId] = useState("");

    const getPolicies = () => {
        axios.get('/policy').then(res => {
            setPolicies(res.data);
            setRelatedPolicy(res.data[0]._id);
        }).catch(err => {
            toast.error("Failed to fetch policies");
        });
    }

    const getMCQs = () => {
        axios.get('/mcq').then(res => {
            setMCQs(res.data);
            setEditMode(new Array(res.data.length).fill(false));
        }).catch(err => {
            toast.error("Failed to fetch MCQs");
        });
    }


    useEffect(() => {
        getPolicies();
        getMCQs();
    }, []);



    const handleOptionChange = (index, value) => {
        let temp = [...options];
        temp[index] = value;
        setOptions(temp);
    }

    const handleEditClick = (index) => {
        setNewQuestion(MCQs[index].mcq);
        setOptions(MCQs[index].answers);
        setCorrectAnswer(MCQs[index].correctAnswer);
        setRelatedPolicy(MCQs[index].Policy);
        setMCQId(MCQs[index]._id);
        setEditMode(true);
        setDisplayAddMCQOverlay(true);
    }

    const handleAddClick = (id) => {
        setNewQuestion("");
        setOptions(["", "", "", "", ""]);
        setCorrectAnswer(-1);
        setRelatedPolicy(policies[0]._id);
        setMCQId("");
        setEditMode(false);
        setDisplayAddMCQOverlay(true);
    }

    const handleDeleteClick = (id) => {
        //ask user for confirmation
        const confirmed = window.confirm("Are you sure you want to delete this MCQ?");
        if (!confirmed) {
            return;
        }

        axios.delete(`/mcq/${id}`).then(res => {
            toast.success("MCQ deleted successfully");
            getMCQs();
        }).catch(err => {
            toast.error("Failed to delete MCQ");
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!newQuestion || !options.every(option => option) || correctAnswer == -1 || !relatedPolicy) {
            toast.error("Please fill all the fields");
            return;
        }

        if(editMode){
            axios.put(`/mcq/${mcqId}`, {
                "mcq": newQuestion,
                "answers": options,
                "correctAnswer": correctAnswer,
                "policy": relatedPolicy
            }).then(res => {
                toast.success("MCQ updated successfully");
                setDisplayAddMCQOverlay(false);
                getMCQs();
            }).catch(err => {
                toast.error("Failed to update MCQ");
            });
        }else{
            axios.post('/mcq',
                {
                    "mcq": newQuestion,
                    "answers": options,
                    "correctAnswer": correctAnswer,
                    "policy": relatedPolicy
                }
            ).then(res => {
                toast.success("MCQ added successfully");
                setDisplayAddMCQOverlay(false);
                getMCQs();
            }).catch(err => {
                toast.error("Failed to add MCQ");
            });
        }
    }

    return (
        <div className="main-container">
            {displayAddMCQOverlay &&
                <OverlayContainer display={setDisplayAddMCQOverlay} >
                    <div className="container">
                        <div className="title">
                            <div className="horizontal-container fx-space-between">
                                <h2>Add MCQ</h2>
                                <span className="policy-select">
                                    <RightIconRectInput extraClass="mcq" type="select"
                                        inputLabel="Related Policy"
                                        options={
                                            policies.map(policy => ({ value: policy._id, label: policy.policyName }))}
                                        value={relatedPolicy}
                                        onChange={(value) => setRelatedPolicy(value)} /></span>
                                <IconButton iconb="close" w="30" bg="red" c="white" onClick={() => setDisplayAddMCQOverlay(false)} />
                            </div>
                        </div>
                        <form onSubmit={(e) => handleSubmit(e)}>
                            <div className="horizontal-container align-flex-start">
                                <h3>Question:</h3>
                                <TextEditor handleChange={setNewQuestion} startingText={newQuestion}/>
                            </div>

                            <div className="verticle-container">
                                {[0, 1, 2, 3, 4].map((index) => (
                                    <div className="horizontal-container justify-flex-start" key={index}>
                                        <RightIconRectInput
                                            extraClass={"mcq"}
                                            inputLabel={`Option ${index + 1}`}
                                            required={true}
                                            value={options[index]}
                                            onChange={(value) => handleOptionChange(index, value)}
                                        />
                                        <input
                                            type="radio"
                                            name="answer"
                                            value={index}
                                            onChange={() => setCorrectAnswer(index)}
                                            checked={correctAnswer == index}
                                            required
                                        />
                                    </div>
                                ))}
                            </div>
                            <br />
                            <div className="horizontal-container fx-end">
                                { editMode ? 
                                    <IconButton type="Update" iconb="done" content="Update MCQ" bg="blue" c="white" />
                                :<IconButton type="Submit" iconb="done" content="Save MCQ" bg="green" c="white" /> }
                            </div>
                        </form>
                    </div>
                </OverlayContainer>
            }
            <div className="container">
                <div className="title">
                    <div className="horizontal-container fx-space-between">
                        <h2>MCQs</h2>
                        <IconButton iconb="add" w="40" bg="green" c="white" onClick={() => handleAddClick("new")} />
                    </div>
                </div>
                {
                    MCQs && MCQs.map((mcq, index) => (
                        <div className="mcq-container container" key={index}>
                            <div className="header">
                                <div className="horizontal-container fx-space-between">
                                    <div>Question</div>

                                    <div>Policy: {
                                        policies.length > 0 &&
                                        //get policy id from mcq and find policy name from policies
                                        policies.find(policy => policy._id === mcq.Policy)?.policyName
                                    }
                                    </div>

                                    <div> Department : {mcq.department} </div>

                                    <div>Level : {mcq.level} </div>

                                    <span className="button-container">
                                        <IconButton iconb="edit" w="30" bg="blue" c="white" onClick={() => handleEditClick(index)} />
                                        <IconButton iconb="delete" w="30" bg="red" c="white" onClick={() => handleDeleteClick(mcq._id)} />
                                    </span>
                                </div>
                            </div>
                            <div className="content">
                                <div dangerouslySetInnerHTML={{ __html: mcq.mcq }}></div>
                                <ol>
                                    {mcq.answers.map((option, index) => (
                                        <li key={index} className={index == mcq.correctAnswer ? "option correct" : "option"}>
                                            {option}
                                        </li>
                                    ))}
                                </ol>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

export default MCQs;