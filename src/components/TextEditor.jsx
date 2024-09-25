import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import DOMPurify from 'dompurify';
import 'react-quill/dist/quill.snow.css'; // Import the styles

import './TextEditor.css';

const TextEditor = ({ startingText, handleChange, suggestionList }) => {
    const [text, setTextLocal] = useState(startingText);
    const [suggestions, setSuggestions] = useState(suggestionList || []);

    // Update text if startingText changes
    useEffect(() => {
        setTextLocal(startingText);
    }, [startingText]);

    // Update suggestions if suggestionList changes
    useEffect(() => {
        setSuggestions(suggestionList);
    }, [suggestionList]);

    // Handle link suggestions logic
    useEffect(() => {
        const linkButton = document.querySelector("button.ql-link");

        // If linkButton isn't found, return early
        if (!linkButton) return;

        const handleLinkClick = () => {
            const linkInput = document.querySelector(".ql-tooltip.ql-editing input");

            if (!linkInput) return;

            let selectionContainer = document.createElement("div");
            selectionContainer.classList.add("selection-container");

            // Ensure no multiple containers are added
            if (!linkInput.parentElement.querySelector(".selection-container")) {
                linkInput.parentElement.appendChild(selectionContainer);
            }

            const renderSuggestions = () => {
                selectionContainer.innerHTML = ""; // Clear previous suggestions

                suggestions.forEach((suggestion) => {
                    if (suggestion.label.toLowerCase().includes(linkInput.value.toLowerCase())) {
                        let suggestionElement = document.createElement("div");
                        suggestionElement.classList.add("suggestion");
                        suggestionElement.innerHTML = suggestion.label;

                        // Update the input field with the selected suggestion
                        suggestionElement.addEventListener("click", () => {
                            linkInput.value = suggestion.value;
                            linkInput.dispatchEvent(new Event("input"));
                        });

                        selectionContainer.appendChild(suggestionElement);
                    }
                }
                );
            };

            renderSuggestions();


            linkInput.addEventListener("input", () => {
                renderSuggestions();
            });
        };

        linkButton.addEventListener("click", handleLinkClick);

        return () => {
            linkButton.removeEventListener("click", handleLinkClick);
        };
    }, [suggestions]); // Only re-run this effect when `suggestions` changes

    // Handle text changes and sanitize input
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
        [{ 'header': [1, 2, 3, false] }, { 'font': [] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{'list': 'ordered'}, {'list': 'bullet'}, 
         {'indent': '-1'}, {'indent': '+1'}],
        ['link', 'image', 'video'],
        ['clean']
    ],
};

TextEditor.formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image', 'video'
  ]

export default TextEditor;
