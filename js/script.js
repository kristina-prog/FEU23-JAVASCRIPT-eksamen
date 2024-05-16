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
    console.log(data); // Viser alle fugler
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
    });
  })
  .catch((error) => {
    console.log("Error: ", error);
  });
