"use strict";
// Gestion de la page des photographes

/* importation des modules */
// import DataApi from "../api/DataApi.js"
// import DataFactory from "../factories/DataFactory.js"
// import PhotographerData from "../templates/PhotographerData.js";
// import PhotographerPortrait from "../templates/PhotographerPortrait.js";
// import MediaCard from "../templates/MediaCard.js";

 /* Variables globales */
const url = "assets/data/photographers.json";

/* Récupération du paramètre ID dans le lien */
const params = (new URL(document.location)).searchParams;
const photographId = parseInt(params.get('id')); 

class Main {
  constructor() {
    this.$photographData = $(".photograph-data");
    this.$photographPortrait = $(".photograph-portrait");
    this.$galleryWrapper = $(".gallery-wrapper");
    this.dataApi = new DataApi(url); /* Création de récupération des données */
  }

  async init() {
    /* Récupération des données du fichier JSON */
    const photographers = await this.dataApi.getPhotographers();
    const medias = await this.dataApi.getMedias();

    /* Création d'un tableau contenant la mise en forme des données des photographes */
    const photographersDataModel = photographers.map(data => new DataFactory(data, 'photographer'));
    const mediaDataModel = medias.map(data => new DataFactory(data, 'media'));
//    debugger;
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

     /* Pour le photographe sélectionné par son ID */
    mediaDataModel.forEach(media => {
     if (media.photographerId == photographId) {
       /* Créer les objets template */
       const templateMedia = new MediaCard(media);
       /* Intégrer les templates dans la page du photographe sélectionné */
       this.$galleryWrapper.append(templateMedia.createMediaCard());
     }
    });
  }
}

const main = new Main();
main.init();