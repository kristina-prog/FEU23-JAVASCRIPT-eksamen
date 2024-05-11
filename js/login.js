document.addEventListener("DOMContentLoaded", function () {
  const crudapiKey = "d5Nb8qtaJKK1JpdgwpVbyYPixSqITasMLWj49DqZ89qNYH0tmg";
  const apiUrl = "https://crudapi.co.uk/api/v1/";
  const dataType = "users";

  const loginForm = document.getElementById("loginForm");
  const errorMsg = document.getElementById("errorMsg");

  // const loginBtn = document.getElementById("loginBtn");
  // const registerBtn = document.getElementById("registerBtn");

  loginForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const username = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
      const response = await fetch(apiUrl + dataType, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer" + crudapiKey,
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.token);
        localStorage.setItem("userId", data.userId);
      } else {
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          const errorData = await response.json();
          errorMsg.innerText = errorData.message;
        } else {
        }
        errorMsg.innerText = "An unexpected error occurred.";
      }
    } catch (error) {
      console.error("Login failed:", error);
      errorMsg.innerText = "An error occured during login.";
    }
  });
});

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
