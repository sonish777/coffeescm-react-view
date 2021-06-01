const withFormValidation = (WrappedComponent) => (props) => {
  const validate = (formInputData) => {
    let error = false;
    let errorText = "";
    formInputData.validation.forEach((validation) => {
      if (validation.type === "REQUIRED") {
        error = formInputData.value.length <= 0;
        errorText = "This field is required";
      }
      if (validation.type === "MINLENGTH") {
        error = formInputData.value.length < validation.value;
        errorText = `Minimum length is ${validation.value}`;
      }
      if (validation.type === "EMAIL") {
        const emailRegex =
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        error = !emailRegex.test(formInputData.value.toLowerCase());
        errorText = "Invalid E-mail format provided";
      }
    });
    formInputData.error = error;
    formInputData.errorText = error && errorText;
    return formInputData;
  };

  const updateErrorData = (formData, name) => {
    let error = true;
    formData[name] = validate(formData[name]);
    Object.values(formData).forEach((formEl) => {
      formEl.touched !== undefined
        ? (error = error && !formEl.error && formEl.touched)
        : (error = error && !formEl.error);
    });
    return [formData, error];
  };

  const updateTouchData = (formData, name) => {
    formData[name] = validate(formData[name]);
    formData[name].touched = true;
    return formData;
  };

  return (
    <WrappedComponent
      {...props}
      updateErrorData={updateErrorData}
      updateTouchData={updateTouchData}
    />
  );
};

export default withFormValidation;
