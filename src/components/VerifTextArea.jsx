import React, { useState,useEffect } from "react";
import { useRef } from "react";

import OneCharTextBox from "./OneCharTextBox"

import './VerifTextArea.css';

const VerifTextArea = ({ setOTP }) => {
  const inputRefs = useRef([]);

  useEffect(()=>{
    const otp = inputRefs.current.map((ref) => ref.value).join("");
    setOTP(otp);
  }, [])

  const handleInput = (event, index) => {
    const value = event.target.value;
    const isNumber = !isNaN(value);
    if (value.length === 1) {
      if (isNumber && index < inputRefs.current.length - 1) {
        inputRefs.current[index + 1].focus();
      } else if (!isNumber) {
        event.target.value = '';
      }
    }

    const otp = inputRefs.current.map((ref) => ref.value).join("");
    setOTP(otp);
  }

  const handleKeyDown = (event, index) => {
    if (event.key === 'Backspace' && event.target.value === '') {
      event.preventDefault();
      if (index > 0) {
        inputRefs.current[index - 1].focus();
        inputRefs.current[index - 1].value = '';
        setOTP("");
      }
    }
  }

  const handlePaste = (event, index) => {
    event.preventDefault();
    const pasteData = event.clipboardData.getData('text');
    for (let i = 0; i < pasteData.length && index + i < inputRefs.current.length; i++) {
      const char = pasteData[i];
      const isNumber = !isNaN(char);
      if (isNumber) {
        inputRefs.current[index + i].value = char;
        if (index + i < inputRefs.current.length - 1) {
          inputRefs.current[index + i + 1].focus();
        }
      }

      if (i == inputRefs.current.length - 1) {
        const otp = inputRefs.current.map((ref) => ref.value).join("");
        setOTP(otp);
      } else {
        setOTP("");
      }
    }
  }

  return (
    <div className="verif-text-area">
      <OneCharTextBox
        index={0}
        setInputRef={el => inputRefs.current[0] = el}
        onInput={event => handleInput(event, 0)}
        onKeyDown={event => handleKeyDown(event, 0)}
        onPaste={event => handlePaste(event, 0)}
      />
      <OneCharTextBox
        index={1}
        setInputRef={el => inputRefs.current[1] = el}
        onInput={event => handleInput(event, 1)}
        onKeyDown={event => handleKeyDown(event, 1)}
        onPaste={event => handlePaste(event, 1)}
      />
      <OneCharTextBox
        index={2}
        setInputRef={el => inputRefs.current[2] = el}
        onInput={event => handleInput(event, 2)}
        onKeyDown={event => handleKeyDown(event, 2)}
        onPaste={event => handlePaste(event, 2)}
      />
      <OneCharTextBox
        index={3}
        setInputRef={el => inputRefs.current[3] = el}
        onInput={event => handleInput(event, 3)}
        onKeyDown={event => handleKeyDown(event, 3)}
        onPaste={event => handlePaste(event, 3)}
      />
      <OneCharTextBox
        index={4}
        setInputRef={el => inputRefs.current[4] = el}
        onInput={event => handleInput(event, 4)}
        onKeyDown={event => handleKeyDown(event, 4)}
        onPaste={event => handlePaste(event, 4)}
      />
    </div>
  );
};

export default VerifTextArea;