window.addEventListener("load", loadFavorites);
function loadFavorites() {
  const favoriteListElement = document.getElementById("favoriteList");
  // Hole die gespeicherten Favoriten aus dem Local Storage
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  // Zeige die Favoriten an
  favoriteListElement.innerHTML = ""; // Leere die Liste, um sie neu zu füllen
  favorites.forEach((favorite) => {
    const li = document.createElement("li");
    li.textContent = `${favorite.name} (ID: ${favorite.id})`;
    favoriteListElement.appendChild(li);
  });
}
