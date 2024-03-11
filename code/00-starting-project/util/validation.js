function postIsValid(title, content) {
  return title && content && title.trim() !== "" && content.trim() !== "";
}

function userCredentialsAreValid(email, confirmEmail, password) {
  return (
    enteredEmail &&
    enteredConfirmEmail & enteredPassword &&
    enteredPassword.trim().length >= 6 &&
    enteredEmail === enteredConfirmEmail &&
    enteredEmail.includes("@")
  );
}

module.exports = {
  postIsValid: postIsValid,
  userCredentialsAreValid: userCredentialsAreValid,
};
