import {useEffect, useState} from "react";

function InputField({ id, label, type, name, handleOnChange, value, validatorTools, checkValidity }) {
    
    const [inputClass, setInputClass] = useState('form-control');
    const [invalidInputMessage, setInvalidInputMessage] = useState([]);

    useEffect(() => {
        if (value !== undefined && checkValidity) {
            const errorMessages = [];
            validatorTools.forEach((element) => {
               const validityState = element.validityFn(value);
               if (!validityState) errorMessages.push(element.invalidMessage);
            });
            if (errorMessages.length === 0) {
                setInputClass('form-control is-valid');
            } else {
                setInputClass('form-control is-invalid');
                setInvalidInputMessage(errorMessages);
            }
        }
    }, [validatorTools, value, checkValidity]);

    return (
        <div className="form-group mb-3">
            <label className="form-label" htmlFor={id}>{label}</label>
            <input type={type} className={inputClass} id={id} onChange={handleOnChange} name={name} />
            <div className="invalid-feedback"><ul>
                {invalidInputMessage.map((message) => (
                    <li key={message}>{message}</li>
                ))}
            </ul></div>
        </div>
    );
}

export default InputField;