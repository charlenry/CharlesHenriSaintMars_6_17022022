/**
 * Nom du fichier : assets\scripts\pages\index.js
 * Fonction : Objet principal qui gère la page d'accueil et qui ordonnance d'autres objets tel un contrôleur dans une architecture MVC.
 * Auteur(s) : Charles-Henri Saint-Mars
**/

"use strict";

/* importation des modules */
//import DataApi from "../api/DataApi.js"
//import DataFactory from "../factories/DataFactory.js"
//import PhotographerCard from "../templates/PhotographerCard.js"

//const url = 'http://httpstat.us/404';
//const url = "https://raw.githubusercontent.com/charlenry/Front-End-Fisheye/main/data/photographers.json";
const url = "assets/data/photographers.json";


class Main {
  constructor() {
    this.$photographersSection = document.querySelector(".photographer_section");
    this.dataApi = new DataApi(url);
  }

  async init() {
    /* Récupération des données du fichier JSON */
    const photographers = await this.dataApi.getPhotographers();

    /* Création d'un tableau contenant la mise en forme des données des photographes */
    const photographersDataModel = photographers.map(data => new DataFactory(data, 'photographer'));

    /* Pour chaque photographe */
    photographersDataModel.forEach(photographer => {
      /* Créer un objet template */
      const templateCard = new PhotographerCard(photographer);

      /* Intégrer l'objet template dans la page d'accueil */
      this.$photographersSection.appendChild(templateCard.createPhotographerCard());
    });
  }
}

const main = new Main();
main.init();
