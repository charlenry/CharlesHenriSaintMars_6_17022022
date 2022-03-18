"use strict";

// Gestion de la page des photographes

 /* Variables globales */
const url = "assets/data/photographers.json";

/* Récupération du paramètre ID dans le lien */
const params = (new URL(document.location)).searchParams;
const photographId = parseInt(params.get('id')); 

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

    /* Pour le photographe sélectionné par son ID */
    photographersDataModel.forEach(photographer => {
      if (photographer.id == photographId) {
        /* Créer les objets template */
        const templateData = new PhotographerData(photographer);
        const templatePortrait = new PhotographerPortrait(photographer);

        /* Intégrer les templates dans la page du photographe sélectionné */
        this.$photographData.append(templateData.createPhotographerData());
        this.$photographPortrait.append(templatePortrait.showPortrait());
      }
      
    });
  }
}

const main = new Main();
main.init();