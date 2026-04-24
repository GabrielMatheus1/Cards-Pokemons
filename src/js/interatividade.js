let IMG_URL = 'https://pokeapi.co/api/v2/pokemon-form/';
let cont = 1


// let TIPOS = 'https://pokeapi.co/api/v2/type'
let TIPOS = 'https://pokeapi.co/api/v2/type/1/'

function getTipos() {
    let req = fetch(TIPOS)
        .then(response => response.json())
        .then(data => {
            // console.log(data);
            document.querySelector('.imagem-personagem').src = data.sprites['generation-iii'].xd.name_icon;
        })
        .catch(error => {
            console.error('Erro ao obter os dados dos pokémons:', error);
        });
}

getTipos();

async function getImgPokemon(id) {
    try {
        let req = await fetch(IMG_URL + id)
        let data = await req.json();

        console.log(data);

        if (!data) {
            cont--;
            getImgPokemon(cont);
            return;
        }

        var imgElement = document.querySelector('.imagem-personagem');
        var nomeElement = document.querySelector('.cartao_nome');
        let idElement = document.querySelector('.cartao_id');
        let elementosPokemon = document.querySelector('.elementos_pokemon');



        idElement.innerHTML = 'N°' + data.id;
        elementosPokemon.innerHTML = '';

        //  data.types.forEach(type => {
        //     let span = document.createElement('span');
        //     span.classList.add('elementos');
        //     span.classList.add(type.type.name);
        //     span.innerHTML = type.type.name;
        //     elementosPokemon.appendChild(span);
        // });

        console.log(data);
        let noShiney = data.sprites.front_default;
        let shiney = data.sprites.front_shiny;

        let randonType = Math.floor(Math.random() * 2);
         if (randonType === 0) {
            imgElement.src = noShiney;
            nomeElement.innerHTML = data.name;
        } else {
            imgElement.src = shiney;
            imgElement.title = 'Shiney';
            nomeElement.title = 'Shiney';
            nomeElement.innerHTML = data.name + ' <span class="material-symbols-outlined shiney">flare</span>';
         }

        
    } catch (err) {
        console.error('Erro ao obter os dados dos pokémons:', err);
    }

}

getImgPokemon(1)

 


function getPokemonsApi(id) {
    fetch('https://pokeapi.co/api/v2/pokemon/' + id)
        .then(response => response.json())
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.error('Erro ao obter os dados dos pokémons:', error);
        });
}


function inserirCard(idPokemon) {
    var pokemon = getPokemonsApi(idPokemon)
    console.log(pokemon);
    let template = `
        <li class="cartao" id="card1">
            <h2 class="nome">${pokemon}</h2>
            <img src="" alt="imagem do Pokémon , um Pokémon de planta venenoso" class="imagem-personagem">
            <h3 class="Titulo">Descrição</h3>
            <div class="descricao">
                <div class="tip">
                    <h4 class="fraq">Elemento</h4>
                        <span class="planta elementos">Planta</span>
                        <span class="venenoso elementos">Venenoso</span>
                    <h4 class="fraq">Fraquezas</h4>
                        <span class="fogo elementos">Fogo</span>
                        <span class="gelo elementos">Gelo</span>
                        <span class="voador elementos">Voador</span>
                        <span class="psiquico elementos">Psíquico</span>
                </div>
                    <br>
                <p class="texto">Por algum tempo após seu nascimento, ele usa os nutrientes que são embalados na semente em suas costas, a fim de crescer.</p>
                <p>Seu peso medio é de 6,9 KG</p>
                <p>Sua altura media é de 0,7 M</p>
                    <h5>informaçoes obtidas do site <a href="https://www.pokemon.com/br/pokedex/bulbasaur">Pokédex</a></h5>
            </div>
        </li>
    `
    document.querySelector('.lista-personagens').innerHTML += template;
}





function nextCard() {
    cont++;
    
    if (cont > 10553) {
        cont = 1;
    }

    getImgPokemon(cont);
    
}

function backCard() {
    cont--;

    if (cont < 1) {
        cont = 10553;
    }
    getImgPokemon(cont);
}

