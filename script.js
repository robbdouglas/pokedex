// Globale Variable für die aktuelle Pokemon-ID
let currentPokemonId = 1;

async function fetchPokemonData() {
  const inputElement = document.getElementById("pokemonInput");
  const errorMessageElement = document.getElementById("errorMessage");
  const pokemonCardElement = document.getElementById("pokemonCard");

  const pokemonName = inputElement.value.trim();

  if (!pokemonName) {
    errorMessageElement.textContent = "Please enter a Pokémon name.";
    errorMessageElement.style.display = "block";
    pokemonCardElement.style.animation = "none";
    return;
  }

  errorMessageElement.style.display = "none";

  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`
    );

    if (!response.ok) {
      throw new Error(`Pokémon not found: ${response.statusText}`);
    }

    const data = await response.json();

    // Aktualisiere die globale Variable mit der aktuellen Pokemon-ID
    currentPokemonId = data.id;

    displayPokemonData(data);
    pokemonCardElement.style.animation = "fadeInDown 0.7s ease-in-out";
  } catch (error) {
    console.error("Error fetching Pokémon data:", error);
    errorMessageElement.textContent =
      "Please enter a valid Pokémon name or ID (between 1 and 1017).";
    errorMessageElement.style.display = "block";
    errorMessageElement.style.color = "red";
    pokemonCardElement.style.animation = "none";
  }
}

function displayPokemonData(data) {
  const pokemonNameElement = document.getElementById("pokemonName");
  const pokemonImageElement = document.getElementById("pokemonImage");
  const pokemonStatsElement = document.getElementById("pokemonStats");
  const pokemonAbilitiesElement = document.getElementById("pokemonAbilities");
  const pokemonTypesElement = document.getElementById("pokemonTypes");
  const pokemonCardElement = document.getElementById("pokemonCard");

  const capitalizedPokemonName =
    data.name.charAt(0).toUpperCase() + data.name.slice(1);

  pokemonNameElement.innerHTML = `${capitalizedPokemonName} (${data.id})`;

  const previousShinySpriteElement = document.querySelector(".shiny-sprite");
  if (previousShinySpriteElement) {
    previousShinySpriteElement.remove();
  }

  if (data.sprites.front_shiny) {
    const shinySpriteElement = document.createElement("img");
    shinySpriteElement.src = data.sprites.front_shiny;
    shinySpriteElement.alt = "Shiny Pokémon";
    shinySpriteElement.title = `${capitalizedPokemonName} (Shiny)`;
    shinySpriteElement.classList.add("shiny-sprite");
    pokemonImageElement.insertAdjacentElement("afterend", shinySpriteElement);
  }

  pokemonImageElement.src = data.sprites.front_default;
  pokemonImageElement.alt = capitalizedPokemonName;
  pokemonImageElement.title = capitalizedPokemonName;

  pokemonStatsElement.innerHTML = "";
  pokemonAbilitiesElement.innerHTML = "";
  pokemonTypesElement.innerHTML = "";

  data.stats.forEach((stat) => {
    const li = document.createElement("li");
    li.textContent = `${stat.stat.name}: ${stat.base_stat}`;
    pokemonStatsElement.appendChild(li);
  });

  data.abilities.forEach((ability) => {
    const li = document.createElement("li");
    li.textContent = ability.ability.name;
    pokemonAbilitiesElement.appendChild(li);
  });

  data.types.forEach((type) => {
    const li = document.createElement("li");
    li.textContent = type.type.name;
    li.style.backgroundColor = getTypeColor(type.type.name);
    pokemonTypesElement.appendChild(li);
  });

  pokemonCardElement.style.display = "block";
}

function getTypeColor(type) {
  switch (type) {
    case "normal":
      return "#908B84";
    case "grass":
      return "#8DAF72";
    case "bug":
      return "#96A51F";
    case "dark":
      return "#4C3A2E";
    case "dragon":
      return "#6657B3";
    case "electric":
      return "#EABB3C";
    case "fairy":
      return "#F1BBEC";
    case "fighting":
      return "#713629";
    case "flying":
      return "#8FA1E0";
    case "fire":
      return "#C4431A";
    case "ghost":
      return "#625FA9";
    case "ground":
      return "#BEAA62";
    case "ice":
      return "#89E3FF";
    case "poison":
      return "#7F4381";
    case "psychic":
      return "#D5537E";
    case "rock":
      return "#B6A462";
    case "steel":
      return "#B5B6BF";
    case "water":
      return "#4393E5";
    default:
      return "#FFFFFF";
  }
}

function navigatePokemon(direction) {
  const inputElement = document.getElementById("pokemonInput");
  const currentId = currentPokemonId;

  const newId =
    direction === "prev" ? Math.max(currentId - 1, 1) : currentId + 1;

  inputElement.value = newId;
  fetchPokemonData();
}

const inputElement = document.getElementById("pokemonInput");
const buttonElement = document.getElementById("pokemonButton");

inputElement.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    fetchPokemonData();
  }
});

function toggleFavorite() {
  const pokemonNameElement = document.getElementById("pokemonName");
  const pokemonId = currentPokemonId;
  const capitalizedPokemonName = pokemonNameElement.innerText.split(" ")[0];

  // Hole die gespeicherten Favoriten aus dem Local Storage
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  // Überprüfe, ob das aktuelle Pokémon ein Favorit ist
  const isFavorite = favorites.some((favorite) => favorite.id === pokemonId);

  if (isFavorite) {
    // Entferne das Pokémon aus den Favoriten
    favorites = favorites.filter((favorite) => favorite.id !== pokemonId);
  } else {
    // Füge das Pokémon zu den Favoriten hinzu
    favorites.push({ id: pokemonId, name: capitalizedPokemonName });
  }

  // Aktualisiere die Favoriten im Local Storage
  localStorage.setItem("favorites", JSON.stringify(favorites));
}
