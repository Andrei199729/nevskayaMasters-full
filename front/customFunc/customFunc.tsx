export const validatePassword = (password: string) => {
  const passwordRegex = /^[a-zA-Z0-9]{6,24}$/;
  return passwordRegex.test(password);
};

export const validateEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validateNumber = (value: string) => {
  const number = parseInt(value);
  return !isNaN(number) && number > 0;
};
