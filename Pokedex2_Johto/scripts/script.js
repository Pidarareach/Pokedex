const poke_container = document.getElementById('poke-container');
const pokemon_start = 152;
const pokemon_count = 252;
const colors = {
    fire: '#FDDFDF',
    grass: '#DEFDEO',
    electric: '#FCF7DE',
    water: '#DEF3FD',
    ground: '#f4e7da',
    rock: '#d5d5d4',
    fairy: '#fceaff',
    poison: '#98d7a5',
    bug: '#f8d5a3',
    dragon: '#97b3e6',
    psychic: '#eaeda1',
    flying: '#F5F5F5',
    fighting: '#E6E0D4',
    normal: '#F5F5F5',
};
const main_types = Object.keys(colors);

async function fetchPokemons() {
    for(let i=pokemon_start; i<pokemon_count; i++){
        await getPokemon(i);
        //console.log(i);
    }
       
}

async function getPokemon(id) {
    const url = 'https://pokeapi.co/api/v2/pokemon/' + id;
    const response = await fetch(url);
    const data = await response.json();
    createPokemonCard(data);
}

function createPokemonCard(pokemon) {
    const pokemonElement = document.createElement('div');
    pokemonElement.classList.add('pokemon');

    const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
    const id = pokemon.id.toString().padStart(3, '0');
    const poke_types = pokemon.types.map(type => type.type.name);
    const type = main_types.find(type => poke_types.indexOf(type) > -1); 
    const color = colors[type];
    pokemonElement.style.backgroundColor = color;

    const pokemonInnerHTML = `
            <div class="img-container">
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png" alt="">
            </div>
            <div class="info">
                <span class="number">#${id}</span>
                <h3 class="name">${name}</h3>
                <small class="type">Type: <span>${type}</span></small>
            </div>`;

    pokemonElement.innerHTML = pokemonInnerHTML;
    poke_container.appendChild(pokemonElement);
}

fetchPokemons()