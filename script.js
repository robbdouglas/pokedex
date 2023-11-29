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
    shinySpriteElement.classList.add("shiny-sprite");
    pokemonImageElement.insertAdjacentElement("afterend", shinySpriteElement);
  }

  pokemonImageElement.src = data.sprites.front_default;

  pokemonStatsElement.innerHTML = "";
  pokemonAbilitiesElement.innerHTML = "";

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

  pokemonCardElement.style.display = "block";
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
