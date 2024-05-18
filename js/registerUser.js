// REGISTER NEW USER

// Make sure DOM is fully loaded before executing the script
document.addEventListener("DOMContentLoaded", function () {
  const crudapiKey = ""; // Se vedlegg for key
  const apiUrl = "https://crudapi.co.uk/api/v1/";
  const dataType = "users";

  const registerForm = document.getElementById("registerForm");
  const registerError = document.getElementById("registerError");

  registerForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const username = document.getElementById("registerEmail").value;
    const password = document.getElementById("registerPassword").value;
    const crudUrl = apiUrl + dataType;

    // POST request to CRUD API to register the user
    try {
      console.log(JSON.stringify({ username, password }));
      const response = await fetch(crudUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + crudapiKey,
        },
        body: JSON.stringify([{ username: username, password: password }]),
      });

      if (!response.ok) {
        throw new Error("Failed to register user");
      }
      // If registration is successful
      const data = await response.json();
      console.log("User registered successfully:", data);
      alert("User registered successfully!");
      registerError.innerText = "";
      window.location.href = "./index.html";
    } catch (error) {
      console.error("Registration error:", error.message);
      registerError.innerText = "Failed to register user. Please try again.";
    }
  });
});
