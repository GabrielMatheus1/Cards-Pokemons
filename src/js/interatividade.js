const POKE_API_URL = 'https://pokeapi.co/api/v2/pokemon/';
const MAX_POKEMON = 1025;
const FALLBACK_IMAGE = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/0.png';

let cont = 1;

const cardElement = document.querySelector('.cartao');
const imageElement = document.querySelector('.imagem-personagem');
const nameElement = document.querySelector('.cartao_nome');
const idElement = document.querySelector('.cartao_id');
const typesElement = document.querySelector('.elementos_pokemon');
const backgroundElement = document.querySelector('.imagem');

const backgroundByType = {
    fire: './src/img/fundo004-006.jpg',
    grass: './src/img/fundo001-003.jfif',
    poison: './src/img/fundo001-003.jfif',
    bug: './src/img/fundo001-003.jfif'
};

function capitalize(text) {
    return text.charAt(0).toUpperCase() + text.slice(1);
}

function formatPokemonNumber(id) {
    return `N° ${String(id).padStart(3, '0')}`;
}

function formatWeight(weight) {
    return `${(weight / 10).toFixed(1)} kg`;
}

function formatHeight(height) {
    return `${(height / 10).toFixed(1)} m`;
}

function updateBackground(primaryType) {
    const backgroundImage = backgroundByType[primaryType] || './src/img/fundo001-003.jfif';
    backgroundElement.src = backgroundImage;
    backgroundElement.alt = `Fundo tematico do tipo ${primaryType}`;
}

function renderTypes(types) {
    typesElement.innerHTML = '';

    types.forEach(({ type }) => {
        const badge = document.createElement('span');
        badge.className = `elementos ${type.name}`;
        badge.textContent = capitalize(type.name);
        typesElement.appendChild(badge);
    });
}

function renderPokemon(data) {
    const primaryType = data.types[0]?.type?.name || 'normal';
    const artwork = data.sprites.other['official-artwork'].front_default;
    const fallbackSprite = data.sprites.front_default;

    nameElement.textContent = capitalize(data.name);
    idElement.textContent = formatPokemonNumber(data.id);
    imageElement.src = artwork || fallbackSprite || FALLBACK_IMAGE;
    imageElement.alt = `Imagem do pokemon ${data.name}`;

    renderTypes(data.types);
    updateBackground(primaryType);

    cardElement.dataset.type = primaryType;
    cardElement.title = `Altura: ${formatHeight(data.height)} | Peso: ${formatWeight(data.weight)}`;
}

async function getPokemon(id) {
    const response = await fetch(`${POKE_API_URL}${id}`);

    if (!response.ok) {
        throw new Error(`Falha ao buscar pokemon ${id}`);
    }

    return response.json();
}

async function loadPokemon(id) {
    cardElement.classList.add('carregando');

    try {
        const pokemon = await getPokemon(id);
        renderPokemon(pokemon);
    } catch (error) {
        console.error('Erro ao obter os dados do pokemon:', error);
        nameElement.textContent = 'Pokemon indisponivel';
        idElement.textContent = formatPokemonNumber(id);
        imageElement.src = FALLBACK_IMAGE;
        imageElement.alt = 'Pokemon indisponivel';
        typesElement.innerHTML = '<span class="elementos unknown">Sem dados</span>';
    } finally {
        cardElement.classList.remove('carregando');
    }
}


function nextCard() {
    cont += 1;

    if (cont > MAX_POKEMON) {
        cont = 1;
    }

    loadPokemon(cont);
}


function backCard() {
    cont -= 1;

    if (cont < 1) {
        cont = MAX_POKEMON;
    }

    loadPokemon(cont);
}


loadPokemon(cont);