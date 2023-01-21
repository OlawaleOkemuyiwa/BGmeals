import { useState } from "react";

const useInput = validateValue => {
  const [enteredValue, setEnteredValue] = useState("");
  const [inputIsTouched, setInputIsTouched] = useState(false);

  const valueIsValid = validateValue(enteredValue);
  const valueHasError = inputIsTouched && !valueIsValid;

  const valueChangeHandler = event => {
    setEnteredValue(event.target.value);
  };

  const inputBlurHandler = event => {
    setInputIsTouched(true);
  };

  const resetFunc = () => {
    setEnteredValue("");
    setInputIsTouched(false);
  };

  return {
    enteredValue,
    valueIsValid,
    valueHasError,
    valueChangeHandler,
    inputBlurHandler,
    resetFunc,
  };
};

export default useInput;
