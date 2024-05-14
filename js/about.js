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
      console.log(data);
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

  /* Functionality for adding this bird species/ observation to a personal list / "Watchlist" */

  const addToWatchlist = async () => {
    // CRUD API
    try {
      console.log("obs:", observation);
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
          },
        ]),
      });
      if (!response.ok) {
        throw new Error("Failed to add to watchlist");
      }

      alert("Bird observation added to watchlist!");
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to add bird observation to watchlist");
    }

    // localstorage
    let watchlist = JSON.parse(localStorage.getItem(speciesCode)) || [];
    watchlist.push(observation);
    localStorage.setItem(speciesCode, JSON.stringify(watchlist));
    alert("Bird observation added to local storage!");
  };

  // const clearList = () => {
  //   localStorage.clear();
  // };

  const addToWatchlistBtn = document.getElementById("addToListBtn");
  addToWatchlistBtn.addEventListener("click", addToWatchlist);

  // clearList();
});

/* WIKIMEDIA for fetching images
Client ID:
7f87d9901ce405e1390e8ed8cd6721fb

Client secret:
b32332012475929b56267983ebbcc8f7bbe2d8e0

Access token:
eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI3Zjg3ZDk5MDFjZTQwNWUxMzkwZThlZDhjZDY3MjFmYiIsImp0aSI6IjNiZjYyMmUxZmFlZmZkYmQ1OTJiYmY3NTAzMGNlYWY2ZDFkNGY5N2JjNGRhZmU3MmNlODY1YTIzNDVlMDg5YTUzNDM0MjYyNzI4NTEwMjk1IiwiaWF0IjoxNzE0OTk2MDM2LjUxNDMzMywibmJmIjoxNzE0OTk2MDM2LjUxNDMzNiwiZXhwIjozMzI3MTkwNDgzNi41MTI1OTYsInN1YiI6Ijc1NTkwOTczIiwiaXNzIjoiaHR0cHM6Ly9tZXRhLndpa2ltZWRpYS5vcmciLCJyYXRlbGltaXQiOnsicmVxdWVzdHNfcGVyX3VuaXQiOjUwMDAsInVuaXQiOiJIT1VSIn0sInNjb3BlcyI6WyJiYXNpYyJdfQ.d-So2dIsYfh4bGSNZYeMRQdAwZXScMCyCm-69OQrskAn6wLNkrLrHEuCSDKZnVS1TXNq-YL4dyy375JvZ1s_BKlqxFb4r5JLhy1Ft58ldb0gD2GvvKDnwySbgqblLG2MH6izw34BjSbGSXKX-Mxk14MFRp7hupkh12mNlgIRU7TMhFjcdpHrxMjSh5vbPQ8XPyWSOD7B-D2npWmorL5b4uv8bOLELXCZxi7cJrQ4wIltiniAxRhvemHzq5W8AOxTTd7h5r8AL1t4JB4Z18D2SatqsMoayxcGyyt_FvQdNnA3zLRwBKiw382nm1votQaR9iscOetLjzCXo06nBno4NuvRIr8ps7oMIdVwUOULElptjtmgig-VXB5qBTRWF3Fs0EKkGtY3ioIlYDqGZUUeqc7gZko1ZAdVlXYYHjBh3vc2037GyNL1X21MOn9yIbSL7yzFhke7VIe7aZdnvXv9q8tU-PrQsyusOFoFYdoVZM1nptmIYRUxXYkQQY1luz_3SvMIrPYAQ-lwHTNgDFHif6HKyt5tJ9SPbuNY_O5kvfvfvLM6Krfv5vsOLobVMmuPGl6qmmzDbmUS5NNkGnTX7EpduE4Lm0s8CCmxCqoxQWEqurW8_wR5_yQbPO2l8xl1JzQtBtvx5CLxV2K30yzli_QkEYkf4ftt4HaG2CMeG7k*/
