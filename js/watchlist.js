// Make sure DOM is fully loaded before executing the script
document.addEventListener("DOMContentLoaded", async function () {
  const crudapiKey = ""; // Se vedlegg for key
  const apiUrl = "https://crudapi.co.uk/api/v1/";
  const dataType = "watchlist";
  const crudUrl = apiUrl + dataType;
  const watchlistElement = document.getElementById("watchlist");

  // Adding birds to watchlist along with a delete button
  const renderWatchlist = function (items) {
    watchlistElement.innerHTML = "";
    items.forEach((item) => {
      const listItem = document.createElement("li");
      listItem.classList.add("listItem");
      listItem.innerText = `${item["Common name"]} (${item["Scientific name"]})`;
      const deletBtn = document.createElement("button");
      deletBtn.textContent = "Delete";
      deletBtn.classList.add("deleteBtn");
      deletBtn.addEventListener("click", () => {
        removeFromList(item);
      });
      listItem.appendChild(deletBtn);
      watchlistElement.appendChild(listItem);
    });
  };

  // DELETE request to the CRUD API
  // Also removes the bird from local storage, if crud delete is successful
  const removeFromList = async function (item) {
    // Item = bird
    try {
      const response = await fetch(crudUrl + "/" + item["_uuid"], {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + crudapiKey,
        },
        body: JSON.stringify([{ _uuid: item["_uuid"] }]),
      });
      if (response.ok) {
        /* Delete item from localStorage ref krav "Sletting fra persistent lagring skal også slettes fra localStorage" */
        localStorage.removeItem(item["Species code"]);
        console.log("Item deleted from CRUD API");
        alert("Item deleted from CRUD API and localStorage");
        location.reload(); // to update the list
      } else {
        console.error("Failed to delete item from CRUD API");
      }
    } catch (error) {
      console.error("Error deleting item from CRUD API", error);
    }
  };

  /* Fetches watchlist from CRUD API and calls renderWatchlist() for displaying items*/
  const displayWatchlist = async function () {
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
        console.log("watchlist data", data); // Birds added to watchlist

        renderWatchlist(data.items);
      } else {
        console.error("Failed to fetch watchlist data");
      }
    } catch (error) {
      console.error("Error fetching watchlist data:", error);
    }
  };

  displayWatchlist();
});
