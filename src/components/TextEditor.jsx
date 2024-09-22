// TextEditor.js
import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import DOMPurify from 'dompurify';
import 'react-quill/dist/quill.snow.css'; // Import the styles

import './TextEditor.css';

const TextEditor = ({ startingText, handleChange }) => {
    const [text, setTextLocal] = useState(startingText);

    useEffect(() => {
        setTextLocal(startingText);
    }, [startingText]);

    const onTextChange = (value) => {
        setTextLocal(value);
        const sanitizedHTML = DOMPurify.sanitize(value);
        handleChange(sanitizedHTML); // Update the parent with sanitized HTML
    };

    return (
        <ReactQuill
            value={text}
            onChange={onTextChange} // Use onChange here
            modules={TextEditor.modules}
            formats={TextEditor.formats}
        />
    );
};

TextEditor.modules = {
    toolbar: [
        [{ 'header': [1, 2, 3, false] }], // Header options
        ['bold', 'italic', 'underline'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        ['clean'], // Remove formatting button
    ],
};

TextEditor.formats = [
    'header', 'bold', 'italic', 'underline',
    'list', 'bullet',
];

export default TextEditor;
