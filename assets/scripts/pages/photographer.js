"use strict";

// Gestion de la page des photographes

//const url = "https://raw.githubusercontent.com/charlenry/Front-End-Fisheye/main/data/photographers.json";
const url = "assets/data/photographers.json";
//const url = 'http://httpstat.us/404';

const params = (new URL(document.location)).searchParams;
const photographId = parseInt(params.get('id')); // Récupération du paramètre ID dans le lien

class Main {
  constructor() {
    this.$photographData = $(".photograph-data");
    this.$photographPortrait = $(".photograph-portrait");
    this.dataApi = new DataApi(url);
  }

  async init() {
    /* Récupération des données du fichier JSON */
    const photographers = await this.dataApi.getPhotographers();
    const media = await this.dataApi.getMedia();

    /* Création d'un tableau contenant la mise en forme des données des photographes */
    const photographersDataModel = photographers.map(data => new DataFactory(data, 'photographer'));
//    const DataModelTable = 

    photographersDataModel.forEach(photographer => {
      if (photographer.id == photographId) {
        /* Création des objets template */
        const templateData = new PhotographerData(photographer);
        const templatePortrait = new PhotographerPortrait(photographer);

        /* Intégration des templates dans la page photographer */
        this.$photographData.append(templateData.createPhotographerData());
        this.$photographPortrait.append(templatePortrait.showPortrait());
      }
      
    });
  }
}

const main = new Main();
main.init();