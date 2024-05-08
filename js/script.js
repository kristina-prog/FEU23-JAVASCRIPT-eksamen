// Your eBird API key: 3ajmef4jnrs

/* GET Recent nearby observations 
https://api.ebird.org/v2/data/obs/geo/recent?lat={{lat}}&lng={{lng}}
*/

const apiKeyBird = "3ajmef4jnrs";
const latitude = "59.13013861789361";
const longitude = "10.226233913008375";

/* fetches recent nearby observations for the specified latitude and longitude using the eBird API */
fetch(
  `https://api.ebird.org/v2/data/obs/geo/recent?lat=${latitude}&lng=${longitude}&key=${apiKeyBird}`
)
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })

  .then((data) => {
    console.log(data);
    const observationsContainer = document.getElementById("observations");
    observationsContainer.innerHTML = "";
    observationsContainer.classList.add("observationsContainer");

    data.forEach((observation) => {
      const observationElement = document.createElement("div");
      observationElement.classList.add("observationElement");
      observationElement.innerHTML = `<h2 class="comName">${observation.comName}</h2> <h3 class="locName">${observation.locName}</h3>`;

      // Make all the observationElements clickable
      observationElement.addEventListener("click", () => {
        const speciesCode = observation.speciesCode;
        window.location.href = `about.html?bird=${speciesCode}`;
      });
      observationsContainer.appendChild(observationElement);

      // const imageElement = document.createElement("img");
      // imageElement.src =
      //   "https://plus.unsplash.com/premium_photo-1687880581630-07ed705e67a8?q=80&w=2680&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
      // imageElement.alt = observation.comName; // Set alt text for accessibility
      // imageElement.classList.add("birdImage");
      // observationElement.appendChild(imageElement);
    });
  })
  .catch((error) => {
    console.log("Error: ", error);
  });

/* WIKIMEDIA for fetching images
Client ID:
7f87d9901ce405e1390e8ed8cd6721fb

Client secret:
b32332012475929b56267983ebbcc8f7bbe2d8e0

Access token:
eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI3Zjg3ZDk5MDFjZTQwNWUxMzkwZThlZDhjZDY3MjFmYiIsImp0aSI6IjNiZjYyMmUxZmFlZmZkYmQ1OTJiYmY3NTAzMGNlYWY2ZDFkNGY5N2JjNGRhZmU3MmNlODY1YTIzNDVlMDg5YTUzNDM0MjYyNzI4NTEwMjk1IiwiaWF0IjoxNzE0OTk2MDM2LjUxNDMzMywibmJmIjoxNzE0OTk2MDM2LjUxNDMzNiwiZXhwIjozMzI3MTkwNDgzNi41MTI1OTYsInN1YiI6Ijc1NTkwOTczIiwiaXNzIjoiaHR0cHM6Ly9tZXRhLndpa2ltZWRpYS5vcmciLCJyYXRlbGltaXQiOnsicmVxdWVzdHNfcGVyX3VuaXQiOjUwMDAsInVuaXQiOiJIT1VSIn0sInNjb3BlcyI6WyJiYXNpYyJdfQ.d-So2dIsYfh4bGSNZYeMRQdAwZXScMCyCm-69OQrskAn6wLNkrLrHEuCSDKZnVS1TXNq-YL4dyy375JvZ1s_BKlqxFb4r5JLhy1Ft58ldb0gD2GvvKDnwySbgqblLG2MH6izw34BjSbGSXKX-Mxk14MFRp7hupkh12mNlgIRU7TMhFjcdpHrxMjSh5vbPQ8XPyWSOD7B-D2npWmorL5b4uv8bOLELXCZxi7cJrQ4wIltiniAxRhvemHzq5W8AOxTTd7h5r8AL1t4JB4Z18D2SatqsMoayxcGyyt_FvQdNnA3zLRwBKiw382nm1votQaR9iscOetLjzCXo06nBno4NuvRIr8ps7oMIdVwUOULElptjtmgig-VXB5qBTRWF3Fs0EKkGtY3ioIlYDqGZUUeqc7gZko1ZAdVlXYYHjBh3vc2037GyNL1X21MOn9yIbSL7yzFhke7VIe7aZdnvXv9q8tU-PrQsyusOFoFYdoVZM1nptmIYRUxXYkQQY1luz_3SvMIrPYAQ-lwHTNgDFHif6HKyt5tJ9SPbuNY_O5kvfvfvLM6Krfv5vsOLobVMmuPGl6qmmzDbmUS5NNkGnTX7EpduE4Lm0s8CCmxCqoxQWEqurW8_wR5_yQbPO2l8xl1JzQtBtvx5CLxV2K30yzli_QkEYkf4ftt4HaG2CMeG7k*/
