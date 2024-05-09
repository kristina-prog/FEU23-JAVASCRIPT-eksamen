// crudapi_key: d5Nb8qtaJKK1JpdgwpVbyYPixSqITasMLWj49DqZ89qNYH0tmg
const apiUrl = "https://crudapi.co.uk/api/v1/{data_type}";

// Login form and button

const loginForm = document.getElementById("loginForm");
const username = document.getElementById("username").value;
const password = document.getElementById("password").value;
const errorMsg = document.getElementById("message");

const loginBtn = document.getElementById("loginBtn");
const registerBtn = document.getElementById("registerBtn");

// loginForm.addEventListener("submit");

// const loginUser = () => {
//   console.log("login");
// };
// const registerUser = () => {
//   console.log("register");
//   console.log("username + password: ", username + password);
// };

// // loginBtn.addEventListener("click", loginUser);
// // registerBtn.addEventListener("click", registerUser);

// const isValid = () => {
//   if (username && password) {
//   } else {
//     errorMsg.innerHTML = "Invalid username or password";
//   }
// };
