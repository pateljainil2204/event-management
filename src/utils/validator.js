// Simple validators for request body fields

const isValidEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

const isValidPassword = (password) => {
  // Minimum 6 characters (you can make it more complex if needed)
  return password && password.length >= 6;
};

const isNonEmptyString = (value) => {
  return typeof value === "string" && value.trim() !== "";
};

const isValidDate = (date) => {
  return !isNaN(Date.parse(date));
};

const isValidTime = (time) => {
  const regex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/; 
  return regex.test(time);
};

const isPositiveNumber = (num) => {
  return typeof num === "number" && num > 0;
};

export {isNonEmptyString, isPositiveNumber, isValidDate, isValidEmail, isValidPassword, isValidTime};