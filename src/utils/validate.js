export const checkValidData = (email, password, name = null) => {
  const err = {};
  const isEmailValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
    email
  );
  const isPasswordValid =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W]).{8,}$/.test(password);

  if (!isEmailValid) err.email = "Please enter a valid email.";
  if (!isPasswordValid) err.password = "Password is not valid.";
  if (name !== null && name.trim().length === 0)
    err.name = "Name cannot be Empty.";
  return err;
};
