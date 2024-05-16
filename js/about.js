document.addEventListener("DOMContentLoaded", function () {
  const apiKeyBird = "3ajmef4jnrs";
  const crudapiKey = "bm2s7HxoXlMTCOz1Twaz_tg6tPfQ1lcdGRiY4lZDY4bkBLr5lQ";
  const apiUrl = "https://crudapi.co.uk/api/v1/";
  const dataType = "watchlist";
  const crudUrl = apiUrl + dataType;

  const latitude = "59.13013861789361";
  const longitude = "10.226233913008375";

  const urlString = window.location.href;
  const url = new URL(urlString);
  const birdParam = url.searchParams.get("bird");
  const speciesCode = birdParam;

  let observation;

  // More information on the selected bird
  fetch(
    `https://api.ebird.org/v2/data/obs/geo/recent/${speciesCode}?lat=${latitude}&lng=${longitude}&key=${apiKeyBird}`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch");
      }
      return response.json();
    })
    .then((data) => {
      observation = data[0];
      console.log(data); // Species
      const selectedBird = document.querySelector("#selectedBird");
      const amount = observation.howMany
        ? `<h3 class="howMany">How many: ${observation.howMany}</h3>`
        : "";
      selectedBird.innerHTML = `
    <h1 class="comName">${observation.comName}</h1>
    <h2 class="sciName">Scientific name: ${observation.sciName}</h2>
    <h3 class="locName">Where: ${observation.locName}</h3>
    <h3 class="obsDt">When: ${observation.obsDt}</h3> 
    ${amount}`;
    })
    .catch((error) => {
      console.log("Error: ", error);
    });

  const addToWatchlist = async () => {
    // CRUD API
    try {
      // Adding bird to watchlist CRUD
      const response = await fetch(crudUrl, {
        method: `POST`,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + crudapiKey,
        },
        body: JSON.stringify([
          {
            "Common name": observation.comName,
            "Scientific name": observation.sciName,
            "Species code": observation.speciesCode,
          },
        ]),
      });
      if (!response.ok) {
        throw new Error("Failed to add to watchlist");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to add bird observation to watchlist");
    }

    // Adding bird to localstorage
    let watchlist = JSON.parse(localStorage.getItem(speciesCode)) || [];
    watchlist.push(observation);
    localStorage.setItem(speciesCode, JSON.stringify(watchlist));
    alert("Bird observation added to watchlist and local storage!");
  };

  const addToWatchlistBtn = document.getElementById("addToListBtn");
  addToWatchlistBtn.addEventListener("click", addToWatchlist);
});
