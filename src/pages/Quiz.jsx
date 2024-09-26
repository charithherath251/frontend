import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import axios from "../utils/axios";

import { UserContext } from "../context/UserContext";

import IconButton from "../components/IconButton";
import RightIconRectInput from "../components/RightIconRectInput";

import "./Quiz.css";


function Quiz() {

    const { userContext, setUserContext } = useContext(UserContext);

    const [_id, set_id] = useState(userContext._id);

    const [quiz, setQuiz] = useState([]);
    const [policies, setPolicies] = useState([]);

    const getQuiz = () => {
        axios.get(`/quiz?id=${_id}`).then((res) => {
            setQuiz(res.data);
        });
    }

    const getPolicies = () => {
        axios.get("/policy").then((res) => {
            setPolicies(res.data);
        });
    }


    useEffect(() => {
        getQuiz();
        getPolicies();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        let answers = [];
        quiz.map((mcq, index) => {
            let options = document.getElementsByName(mcq._id);
            let selected = Array.from(options).find(option => option.checked);
            if (selected) {
                answers.push({ id: mcq._id, answer: selected.id.split(mcq._id)[1] });
            }
        });

        axios.post( `/quiz?id=${_id}`, { answers }).then((res) => {
            toast.success("Quiz submitted successfully");
            toast.info("You score is : " + res.data.score + " / " + res.data.total);
            toast.info("You are now at level : " + res.data.level);
        }).catch((err) => {
            toast.error("Failed to submit quiz");
        });
    }

    return (
        <div className="main-container">
            <div className="container">
                <div className="title">
                    <div className="horizontal-container fx-space-between">
                        <h2>MCQs</h2>
                    </div>
                </div>
                <form class="quiz-form" onSubmit={handleSubmit}>
                {
                    quiz && quiz.map((mcq, index) => (
                        <div className="mcq-container container" key={index}>
                            <div className="header">
                                <div className="horizontal-container fx-space-between">
                                    <div>Question {index + 1}</div>

                                    <div>Policy: {
                                        policies.length > 0 &&
                                        policies.find(policy => policy._id === mcq.Policy)?.policyName
                                    }
                                    </div>

                                    <div> Department : {mcq.department} </div>

                                    <div>Level : {mcq.level} </div>

                                    <span className="button-container">

                                    </span>
                                </div>
                            </div>
                            <div className="content">
                                <div dangerouslySetInnerHTML={{ __html: mcq.mcq }}></div>
                                    {mcq.answers.map((option, index) => (
                                        <div key={index} className="option selectable">
                                            <input type="radio" name={mcq._id} id={mcq._id + index} required/>
                                            <label htmlFor={mcq._id + index} dangerouslySetInnerHTML={{ __html: option }}></label>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    ))
                }
                <div className="horizontal-container fx-end">
                    <IconButton iconb="done" content="Submit" bg="green" c="white" />
                </div>
                </form>
            </div>
        </div>
    );
}

export default Quiz;