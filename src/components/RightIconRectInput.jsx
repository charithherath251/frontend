import { useState, useEffect } from "react"

import "./RightIconRectInput.css"

function RightIconRectInput({ extraClass, placeholder = "", value = "", name = "", inputLabel = "", icon, height = 40, type = "text", options, required, onChange }) {
  const [userValue, setValue] = useState(value);

  useEffect(() => {
    setValue(value); // Update internal state when value prop changes
  }, [value]);

  return (
    <>
      {inputLabel &&
        <label htmlFor="" className={`right-iconned-input__label ${extraClass}__label`}>
          {inputLabel}
        </label>}
      <div className={`right-iconned-input ${extraClass}__input`} style={{ height: height }}>
        {type != "select" ?
          <>
            <input type={type} onChange={(e) => { setValue(e.target.value); onChange?.(e.target.value) }} placeholder={placeholder} value={userValue} name={name} required={required ? "required" : ""} />
            {icon && <span className="">{icon}</span>}
          </> :

          <select onChange={(e) => { setValue(e.target.value); onChange?.(e.target.value) }} value={userValue} name={name} required={required ? "required" : ""}>
            {options.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
          </select>
        }

      </div>
    </>
  );
}

export default RightIconRectInput;