// Login form and button

const loginForm = document.getElementById("loginForm");
const username = document.getElementById("username").value;
const password = document.getElementById("password").value;
const errorMsg = document.getElementById("message");

loginForm.addEventListener("submit", isValid);

const isValid = () => {
  if (username && password) {
  } else {
    errorMsg.innerHTML = "Invalid username or password";
  }
};
