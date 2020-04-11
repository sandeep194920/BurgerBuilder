export const updateObject = (oldObject, updatedProperties) => {
  return {
    ...oldObject,
    ...updatedProperties,
  };
};

export const checkValidity = (value, rules) => {
  // This is required if rules is undefined for a particular type of inputElement. In this case we have deliveryMethod for which we dont have any validation.
  if (!rules) {
    return true;
  }
  // if this method returns true then the field on the form is valid else not
  let isValid = false;

  // All the rules in the validation object (for inputElement) is validated here and returned as true or false
  if (rules.required) {
    isValid = value.trim() !== "";
  }
  if (rules.minLength) {
    isValid = value.length >= rules.minLength; // Zipcode has a minLenth rule here so this would be applied for that
  }

  if (rules.maxLength) {
    isValid = value.length <= rules.maxLength && isValid; // Zipcode has a maxLenth rule here so this would be applied for that
  }
  // The bug of minLength and maxLength has now been fixed by adding && isValid. You are also considering the minLength
  // result for maxLength validation so that both has to be true for the result to be true. That solves the problem.

  // The other ways is by turining isValid initially defined to true and including that in every check. Max does take
  // this approach but I am leaving mine here for now. We can come back to this if my rule doesn't work as expected.

  // console.log(isValid);

  return isValid;
};
