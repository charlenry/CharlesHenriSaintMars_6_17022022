"use strict";
// Gestion de la page d'accueil

const url = "https://raw.githubusercontent.com/charlenry/Front-End-Fisheye/main/data/photographers.json";
//const url = "/data/photographers.json";
//const url = 'http://httpstat.us/404';

class Main {
  constructor() {
    this.$photographersSection = document.querySelector(".photographer_section");
    this.dataApi = new DataApi(url);
  }

  async init() {
    const photographers = await this.dataApi.getPhotographers();
    const media = await this.dataApi.getMedia();
//    debugger;
    const photographersTable = photographers.map(data => new DataFactory(data, 'photographer'));

    photographersTable.forEach(photographer => {
      console.log("=====");
      console.log(photographer);
      console.log("=====");
      const template = new PhotographerCard(photographer);
      this.$photographersSection.appendChild(template.createPhotographerCard());
    });
  }
}

const main = new Main();
main.init();
