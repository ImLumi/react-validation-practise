import './App.scss';
import {useState} from "react";
import InputField from "./components/InputField";
import validator from "validator";

const validatorTools = {
    email: [
        {
            validityFn: (string) => !validator.isEmpty(string),
            invalidMessage: 'Don\'t leave it empty!'
        },
        {
            validityFn: (string) => validator.isEmail(string),
            invalidMessage: 'Invalid email address!'
        }
    ],
    password: [
        {
            validityFn: (string) => !validator.isEmpty(string),
            invalidMessage: 'Don\'t leave it empty!'
        },
        {
            validityFn: (string) => validator.isStrongPassword(string, {minSymbols: 0}),
            invalidMessage: 'Your password is not strong enough!'
        }
    ]
};

function App() {
    const [formData, setFormData] = useState({email: '', password: ''});
    const [checkValidity, setCheckValidity] = useState(false);

    const handleOnChange = (e) => {
        const inputElement = e.target;
        setFormData({...formData, [inputElement.name]: inputElement.value});
    };

    const handleOnSubmit = (e) => {
        e.preventDefault();
        setCheckValidity(true);
        console.log('VALIDATED');
    }

    return (
        <div className="container">
            <form onSubmit={handleOnSubmit} noValidate>
                <InputField
                    id="email"
                    label="Email"
                    type="email"
                    name="email"
                    handleOnChange={handleOnChange}
                    value={formData.email}
                    validatorTools={validatorTools.email}
                    checkValidity={checkValidity}
                />
                <InputField
                    id="password"
                    label="Password"
                    type="password"
                    name="password"
                    handleOnChange={handleOnChange}
                    value={formData.password}
                    validatorTools={validatorTools.password}
                    checkValidity={checkValidity}
                />
                <button type="submit" className="btn btn-primary">SUBMIT</button>
            </form>
        </div>
    );
}

export default App;
