// REGISTER NEW USER

document.addEventListener("DOMContentLoaded", function () {
  const crudapiKey = "d5Nb8qtaJKK1JpdgwpVbyYPixSqITasMLWj49DqZ89qNYH0tmg";
  let apiUrl = "https://crudapi.co.uk/api/v1/";
  const dataType = "users";

  const registerForm = document.getElementById("registerForm");
  const registerError = document.getElementById("registerError");

  registerForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const username = document.getElementById("registerEmail").value;
    const password = document.getElementById("registerPassword").value;

    fetch((apiUrl += dataType), {
      /* POST https://crudapi.co.uk/api/v1/users 400 (Bad Request)*/
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + crudapiKey,
      },
      body: JSON.stringify({ username, password }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to register user");
        }
        return response.json();
      })
      .then((data) => {
        console.log("User registered successfully:", data);
        registerError.innerText = "";
        window.location.href = "./myList.html";
      })
      .catch((error) => {
        console.error("Registration error:", error.message);
        registerError.textContent =
          "Failed to register user. Please try again.";
      });
  });
});
