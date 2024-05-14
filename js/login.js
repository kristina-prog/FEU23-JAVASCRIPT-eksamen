// LOGIN

document.addEventListener("DOMContentLoaded", function () {
  const crudapiKey = "bm2s7HxoXlMTCOz1Twaz_tg6tPfQ1lcdGRiY4lZDY4bkBLr5lQ";
  const apiUrl = "https://crudapi.co.uk/api/v1/";
  const dataType = "users";

  const loginForm = document.getElementById("loginForm");
  const loginError = document.getElementById("loginError");

  loginForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const username = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;
    const crudUrl = apiUrl + dataType;

    try {
      const response = await fetch(crudUrl, {
        /* Failed to load resource: the server responded with a status of 400 */
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + crudapiKey,
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log("data", data);
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
