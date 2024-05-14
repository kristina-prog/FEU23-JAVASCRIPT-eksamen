// REGISTER NEW USER

document.addEventListener("DOMContentLoaded", function () {
  const crudapiKey = "bm2s7HxoXlMTCOz1Twaz_tg6tPfQ1lcdGRiY4lZDY4bkBLr5lQ";
  const apiUrl = "https://crudapi.co.uk/api/v1/";
  const dataType = "users";

  const registerForm = document.getElementById("registerForm");
  const registerError = document.getElementById("registerError");

  registerForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const username = document.getElementById("registerEmail").value;
    const password = document.getElementById("registerPassword").value;
    const crudUrl = apiUrl + dataType;

    try {
      console.log(JSON.stringify({ username, password }));
      const response = await fetch(crudUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + crudapiKey,
        },
        // body: JSON.stringify({ username, password }),
        body: JSON.stringify([{ username: username, password: password }]),
      });

      if (!response.ok) {
        throw new Error("Failed to register user");
      }
      const data = await response.json();
      console.log("User registered successfully:", data);
      registerError.innerText = "";
      window.location.href = "./myList.html";
    } catch (error) {
      console.error("Registration error:", error.message);
      registerError.innerText = "Failed to register user. Please try again.";
    }
  });
});
