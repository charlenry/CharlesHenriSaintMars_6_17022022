"use strict";

async function getPhotographers() {
  // Penser à remplacer par les données récupérées dans le json
  const url = "https://raw.githubusercontent.com/charlenry/Front-End-Fisheye/main/data/photographers.json";
//  const url = "assets/data/photographers.json";
//   const url = 'http://httpstat.us/500';

  const photographers = await fetch(url)
  .then(response => {
    if(response.ok) return response.json();
    else throw new Error(response.statusText);
  })
  .then(data => {
    return (data.photographers);
  })
  .catch(error => {
    console.log(`HTTP Error: ${error.message}`);
  });
  return photographers;


  /* const photographers = [
    {
        "name": "Ma data test",
        "id": 1,
        "city": "Paris",
        "country": "France",
        "tagline": "Ceci est ma data test",
        "price": 400,
        "portrait": "account.png"
    },
    {
        "name": "Autre data test",
        "id": 2,
        "city": "Londres",
        "country": "UK",
        "tagline": "Ceci est ma data test 2",
        "price": 500,
        "portrait": "account.png"
    },
  ] */
  // et bien retourner le tableau photographers seulement une fois
  // return ({photographers: [...photographers, ...photographers, ...photographers]});
}

async function displayData(photographers) {
  const photographersSection = document.querySelector(".photographer_section");
  photographers.forEach((photographer) => {
      const photographerModel = photographerFactory(photographer);
      const userCardDOM = photographerModel.getUserCardDOM();
      photographersSection.appendChild(userCardDOM);
  });
};

async function init() {
  // Récupère les datas des photographes
  const photographers = await getPhotographers();
  displayData(photographers);
};

init();
