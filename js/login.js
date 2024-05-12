// LOGIN

document.addEventListener("DOMContentLoaded", function () {
  const crudapiKey = "d5Nb8qtaJKK1JpdgwpVbyYPixSqITasMLWj49DqZ89qNYH0tmg";
  let apiUrl = "https://crudapi.co.uk/api/v1/";
  const dataType = "users";

  const loginForm = document.getElementById("loginForm");
  const loginError = document.getElementById("loginError");

  loginForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const username = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    try {
      const response = await fetch((apiUrl += dataType), {
        /* Failed to load resource: the server responded with a status of 400 */
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + crudapiKey,
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
          loginError.innerText = errorData.message;
        } else {
        }
        loginError.innerText = "An unexpected error occurred.";
      }
    } catch (error) {
      console.error("Login failed:", error);
      loginError.innerText = "An error occured during login.";
    }
  });
});
