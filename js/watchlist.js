document.addEventListener("DOMContentLoaded", async function () {
  const crudapiKey = "bm2s7HxoXlMTCOz1Twaz_tg6tPfQ1lcdGRiY4lZDY4bkBLr5lQ";
  const apiUrl = "https://crudapi.co.uk/api/v1/";
  const dataType = "watchlist";
  const crudUrl = apiUrl + dataType;

  const getWatchlist = async function (event) {
    event.preventDefault();

    try {
      const response = await fetch(crudUrl, {
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
  };
});
