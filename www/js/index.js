'use strict';

const catFactsQuery = async () => {
  try {
    //Conecto con la API catfact y recibo un dato aleatorio sobre gatos.
    const responseCatFact = await fetch(
      'https://catfact.ninja/fact?max_length=1000'
    );
    const { fact } = await responseCatFact.json();

    //Convertimos el texto a minúsculas
    //Obtengo las tres primeras palabras del dato random y lo formateo
    const lastWordOfSearch = fact.toLowerCase().split(' ', 3).join('+');

    //Conecto con la API GIPHY para obtener una imágen con las tres primeras palabras
    const responseGiphy = await fetch(
      `http://api.giphy.com/v1/gifs/search?q=${lastWordOfSearch}&api_key=rV8SHpmCe6IsoU5u0kqUF9LBj3p8RUFw&limit=1`
    );

    const { data } = await responseGiphy.json();

    //Obtenemos la url de la imagen

    const imageGiphyCatFacts = data[0].images.original.url;

    //Seleccionamos el nodo al que se le aplicarán los cambios
    const articleMain = document.querySelector('article');

    //Añadimos el HTML al DOM
    articleMain.innerHTML = `
    <img src="${imageGiphyCatFacts}" alt="">
    <h2>${fact}</h2>    
    `;
  } catch (error) {
    const articleMain = document.querySelector('article');
    articleMain.innerHTML = `
    <h2>No se ha encontrado la imagen adecuada, presiona el botón</h2>    
    `;
  }
};

catFactsQuery();

//Seleccionamos el botón donde se hará el evento
const button = document.querySelector('button');

button.addEventListener('click', () => {
  //Borramos el interior del article
  const articleMain = document.querySelector('article');
  articleMain.innerHTML = '';

  //Llamamos de nuevo a la función catFactsQuery
  catFactsQuery();
});
