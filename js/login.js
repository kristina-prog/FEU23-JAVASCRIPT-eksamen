// LOGIN

/* test-user: password: "123", username: "kristina.birkeli@gmail.com"*/

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
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + crudapiKey,
        },
      });

      if (response.ok) {
        loginError.innerText = "";
        const data = await response.json();
        const users = data.items;
        // console.log("Users: ", users); // List of all the registered users

        /* Checking if the provided username and password match any of the users in the response */
        const user = users.find(
          (user) => user.username === username && user.password === password
        );
        if (user) {
          console.log("User logged in successfully:", user);
          alert("You are now logged in!");
          window.location.href = "./index.html";
        } else {
          loginError.innerText = "Invalid username or password";
        }
      } else {
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          const errorData = await response.json();
          loginError.innerText = errorData.message;
        } else {
          loginError.innerText = "An unexpected error occurred.";
        }
      }
    } catch (error) {
      console.error("Login failed:", error);
      loginError.innerText = "An error occured during login.";
    }
  });
});
