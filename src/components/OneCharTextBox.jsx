import React from "react";

import './OneCharTextBox.css';

const OneCharTextBox = (props) => {
    return (
        <input maxLength="1" type="text" className="one-char-text-box" autoComplete="off"
            id={props.id}
            value={props.value}
            ref={props.setInputRef}
            onInput={props.onInput}
            onKeyDown={props.onKeyDown}
            onPaste={props.onPaste}
        />
    )
}

export default OneCharTextBox;