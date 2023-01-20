'use strict';

/***************************************
 HELPERS
 ***************************************/

//Función que formatea las tres primeras palabras de las API de los gatos
const formatSearchGiphy = (fact) => {
  //Convertimos el texto a minúsculas
  //Obtengo las tres primeras palabras del dato random y lo formateo

  const lastWordOfSearch = fact.toLowerCase().split(' ', 3).join('+');
  return lastWordOfSearch;
};

//Función para la peticion del gift
const queryGiphy = async (lastWordOfSearch) => {
  try {
    //Conecto con la API GIPHY para obtener una imágen con las tres primeras palabras
    const responseGiphy = await fetch(
      `http://api.giphy.com/v1/gifs/search?q=${lastWordOfSearch}&api_key=rV8SHpmCe6IsoU5u0kqUF9LBj3p8RUFw&limit=1`
    );

    const { data } = await responseGiphy.json();

    //Obtenemos la url de la imagen

    const imageGiphyCatFacts = data[0].images.original.url;

    return `    <img src="${imageGiphyCatFacts}" alt="">
    `;
  } catch (error) {
    return `    <img src="no_disponible.jpeg" alt="">
    `;
  }
};
/******************************
 PINTANDO EL ARTICLE CON FACTS RANDOM
 ******************************/
//Función para pintar el article, llama a la API de un solo fact
const catFactsQueryRandom = async () => {
  try {
    //Conecto con la API catfact y recibo un dato aleatorio sobre gatos.
    const responseCatFact = await fetch(
      `https://catfact.ninja/fact?max_length=500`
    );
    const { fact } = await responseCatFact.json();

    //Seleccionamos el nodo al que se le aplicarán los cambios
    const articleMain = document.querySelector('article');
    //Instamos a la función para que nos devuelva un gif
    const imageGiphyCatFacts = await queryGiphy(formatSearchGiphy(fact));

    //Añadimos el HTML al DOM
    articleMain.innerHTML = `
    ${imageGiphyCatFacts}
    <h2>${fact}</h2>    
    `;
    return fact;
  } catch (error) {
    const articleMain = document.querySelector('article');
    articleMain.innerHTML = `
    <h2>UPSSSSS, PRESS AGAIN</h2>    
    `;
  }
};

//Seleccionamos el botón donde se hará el evento
const button = document.querySelector('button');

button.addEventListener('click', () => {
  //Borramos el interior del article
  const articleMain = document.querySelector('article');
  articleMain.innerHTML = '';

  //Llamamos de nuevo a la función catFactsQuery
  catFactsQueryRandom();
});

/***********************************************
    Construyendo el formulario Select
    ************************************************/
//Seleccionamos el nodo del select

const selectFact = document.getElementById('fact-select');

//Llamamos a la API

const selectCat = async () => {
  //const optionsFact = await catFactsQuery(20);
  // console.log(optionsFact);
};
selectCat();
