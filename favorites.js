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

    // Erstelle ein span-Element für den "X"-Button
    const deleteButton = document.createElement("span");
    deleteButton.textContent = "X";
    deleteButton.className = "delete-button";

    // Füge einen Event-Listener hinzu, um das Element zu löschen
    deleteButton.addEventListener("click", (event) => {
      event.stopPropagation(); // Stoppe die Ereignis-Propagation, um das Klicken auf das Listenelement zu verhindern
      deleteFavorite(favorite.id);
      loadFavorites(); // Lade die Favoriten neu, um die Liste zu aktualisieren
    });

    // Füge einen Event-Listener hinzu, um zur Hauptseite mit dem Pokémon zurückzukehren
    li.addEventListener("click", () => {
      window.location.href = `index.html#${favorite.id}`; // Hier die URL deiner Hauptseite eintragen und die Pokémon-ID als Anker verwenden
    });

    // Füge den "X"-Button und das Listenelement zur Liste hinzu
    li.appendChild(deleteButton);
    favoriteListElement.appendChild(li);
  });

  // Füge den Back-Button-Event-Listener hinzu
  const backButton = document.getElementById("backButton");
  backButton.addEventListener("click", () => {
    window.location.href = "index.html";
  });
}

function deleteFavorite(favoriteId) {
  // Hole die gespeicherten Favoriten aus dem Local Storage
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  // Filtere das Favoritenobjekt mit der angegebenen ID heraus
  const updatedFavorites = favorites.filter(
    (favorite) => favorite.id !== favoriteId
  );

  // Aktualisiere die Favoriten im Local Storage
  localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
}
