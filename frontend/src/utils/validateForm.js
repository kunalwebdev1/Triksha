export const validateForm = (fields) => {
  let errors = {};
  Object.keys(fields).forEach((key) => {
    if (!fields[key]) {
      errors[key] = `${key} is required`;
    }
  });
  return errors;
};
