document.addEventListener("DOMContentLoaded", async function () {
  const crudapiKey = "bm2s7HxoXlMTCOz1Twaz_tg6tPfQ1lcdGRiY4lZDY4bkBLr5lQ";
  const apiUrl = "https://crudapi.co.uk/api/v1/";
  const dataType = "watchlist";
  const crudUrl = apiUrl + dataType;
  const watchlistElement = document.getElementById("watchlist");

  // display items on the watchlist
  const displayWatchlist = async function () {
    const renderWatchlist = function (items) {
      watchlistElement.innerHTML = "";
      items.forEach((item) => {
        console.log(item);
        const listItem = document.createElement("li");
        listItem.innerText = `${item["Common name"]} (${item["Scientific name"]})`;
        const deletBtn = document.createElement("button");
        deletBtn.textContent = "Delete";
        deletBtn.addEventListener("click", () => {});
        listItem.appendChild(deletBtn);
        watchlistElement.appendChild(listItem);
      });
    };

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
        console.log("watchlist data", data);
        localStorage.setItem("watchlist", JSON.stringify(data));
        renderWatchlist(data.items);
      } else {
        console.error("Failed to fetch watchlist data");
      }
    } catch (error) {
      console.error("Error fetching watchlist data:", error);
    }

    const removeFromList = async function (item) {
      try {
        const response = await fetch(crudUrl + "/" + item.id, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + crudapiKey,
          },
        });
        if (response.ok) {
          console.log("Item deleted from CRUD API");
        }
      } catch {}
    };
  };

  // Slette alt fra local storage
  const clearList = () => {
    localStorage.clear();
  };

  const clearListBtn = document.getElementById("clearListBtn");
  clearListBtn.addEventListener("click", clearList);

  displayWatchlist();
});
