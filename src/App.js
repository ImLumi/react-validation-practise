import { useEffect, useState } from 'react';
import './App.scss';
import Input from './components/Input/Input';
import validator from 'validator';

const INPUT_NAMES = {
  USERNAME: 'username',
  EMAIL_ADDRESS: 'emailAddress',
  PASSWORD: 'password',
}

const rules = {
  username: [{
    validityFn: (value) => !validator.isEmpty(value),
    invalidMessage: 'Üresen hagytad!',
  }],
  emailAddress: [
    {
      validityFn: (value) => !validator.isEmpty(value),
      invalidMessage: 'Üresen hagytad!',
    },
    {
      validityFn: (value) => validator.isEmail(value),
      invalidMessage: 'Helytelen email cím!',
    }
  ],
  password: [
    {
      validityFn: (value) => !validator.isEmpty(value),
      invalidMessage: 'Üresen hagytad!',
    },
    {
      validityFn: (value) => validator.isLength(value, { min: 8 }),
      invalidMessage: "Legalább 8 karakter hosszú kell legyen!"
    }
  ]
};

function App() {
  const [formData, setFormData] = useState({});
  const [wasValidated, setWasValidated] = useState(true);
  const [inputValidationObj, setInputValidationObj] = useState({});
  const [isValidForm, setIsValidForm] = useState(false);

  useEffect(() => {
    if (wasValidated) {
      const inputNames = Object.keys(formData);
      inputNames.forEach((inputName) => {
        const invalidRule = rules[inputName].find((rule) => !rule.validityFn(formData[inputName]));
        const inputValidation = {};
        if (invalidRule !== undefined) {         
          inputValidation.className = 'is-invalid';
          inputValidation.invalidMessage = invalidRule.invalidMessage;
        } else {
          inputValidation.className = 'is-valid';
          inputValidation.invalidMessage = '';
        }
        setInputValidationObj((prev) => ({...prev, [inputName]:inputValidation}))
      });
    }
  }, [formData, wasValidated]);

  useEffect(()=>{
    const inputValidations = Object.values(inputValidationObj);
    if (inputValidations.length === 3) {
      if (inputValidations.every(({className}) => className === 'is-valid')) setIsValidForm(true) 
      else setIsValidForm(false)
    }
  }, [inputValidationObj])

  // useEffect(() => console.log(formData), [formData]);
  // useEffect(() => console.log(inputValidationObj), [inputValidationObj]);

  const handleOnChange = ({ target: { name, value } }) => {
    setFormData((prevData) => ({ ...prevData, [name]: value }))
  };
  
  const handleOnSubmit = (event) => {
    event.preventDefault();
    setWasValidated(true);
  }

  return (
    <form className='container' onChange={handleOnChange} onSubmit={handleOnSubmit} noValidate={true}>
      <h1>Felhasználó regisztráció:</h1>
      <Input
        label="Felhasználónév"
        type="text"
        name={INPUT_NAMES.USERNAME} // csak egy próbálkozás volt, láttam ilyen fajta const-al megadást Web Dev Simplified csatornáján
        className={(`form-control ${inputValidationObj[INPUT_NAMES.USERNAME]?.className}`)}
        invalidMessage={inputValidationObj[INPUT_NAMES.USERNAME]?.invalidMessage}
      />

      <Input
        label="Email"
        type="email"
        name="emailAddress"
        className={(`form-control ${inputValidationObj.emailAddress?.className}`)}
        invalidMessage={inputValidationObj.emailAddress?.invalidMessage}
      />

      <Input
        label="Jelszó"
        type="password"
        name="password"
        className={(`form-control ${inputValidationObj.password?.className}`)}
        invalidMessage={inputValidationObj.password?.invalidMessage}
      />
      <button disabled={!isValidForm} className="btn btn-success">Submit</button>
    </form>
  );
}

export default App;
