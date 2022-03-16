"use strict";

// Gestion de la page des photographes

//const url = "https://raw.githubusercontent.com/charlenry/Front-End-Fisheye/main/data/photographers.json";
const url = "assets/data/photographers.json";
//const url = 'http://httpstat.us/404';

const params = (new URL(document.location)).searchParams;
const photographId = parseInt(params.get('id')); // Récupération du paramètre ID dans le lien

class Main {
  constructor() {
    this.$photographData = document.querySelector(".photograph-data");
    this.$photographPortrait = document.querySelector(".photograph-portrait");
    this.dataApi = new DataApi(url);
  }

  async init() {
    const photographers = await this.dataApi.getPhotographers();
    const media = await this.dataApi.getMedia();
//    debugger;
    const photographersTable = photographers.map(data => new DataFactory(data, 'photographer'));

    photographersTable.forEach(photographer => {
      if (photographer.id == photographId) {
        const templateData = new PhotographerData(photographer);
        const templatePortrait = new PhotographerPortrait(photographer);
        this.$photographData.appendChild(templateData.createPhotographerCard());
        this.$photographPortrait.appendChild(templatePortrait.showPortrait());
      }
      
    });
  }
}

const main = new Main();
main.init();