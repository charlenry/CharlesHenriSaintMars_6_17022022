/**
 * Nom du fichier : assets\scripts\pages\photographer.js
 * Fonction : Objet principal qui gère la page de chaque photographe et qui ordonnance d'autres objets tel un contrôleur dans une architecture MVC.
 * Auteur(s) : Charles-Henri Saint-Mars
**/

"use strict";

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
let totalLikes = 0;
let pricePhotographer;

class Main {
  constructor() {
    this.$photographData = $(".photograph-data");
    this.$photographPortrait = $(".photograph-portrait");
    this.$galleryWrapper = $(".gallery-wrapper");
    this.$sorterWrapper = $(".sorter-wrapper");
    this.$totalLikes = $(".total-likes");
    this.$price = $(".price");
    this.$bannerWrapper = $(".banner-wrapper"); 
    this._dataApi = new DataApi(url); /* Création de récupération des données */

    // Likes Pub/Sub
     this._likesSubject = new LikesSubject();
     this._likesCounter = new LikesCounter();
     this._likesSubject.subscribe(this._likesCounter);
  }

  async init() {
    /* Récupération des données du fichier JSON */
    const photographers = await this._dataApi.getPhotographers();
    const medias = await this._dataApi.getMedias();

    /* Création d'un tableau contenant la mise en forme des données des photographes */
    const photographersDataModel = photographers.map(data => new DataFactory(data, 'photographer'));
    const mediasDataModel = medias.map(data => new DataFactory(data, 'media'));

    /* Pour le photographe sélectionné par son ID */
    photographersDataModel.forEach(photographer => {
      if (photographer.id === photographId) {
        /* Garder en mémoire le prix du photographe sélectionné */
        pricePhotographer = photographer.price;

        /* Créer les objets template */
        const templateData = new PhotographerData(photographer);
        const templatePortrait = new PhotographerPortrait(photographer);

        /* Intégrer les templates dans la page du photographe sélectionné */
        this.$photographData.append(templateData.createPhotographerData());
        this.$photographPortrait.append(templatePortrait.showPortrait());
      }
    });

    const contactForm = new ContactModal();
    contactForm.createFormContact();

    // Tableau des medias du photographe sélectionné
    const thatPhotograherMedias = mediasDataModel.filter(media => media.photographerId === photographId);
    const Sorter = new SorterTemplate(thatPhotograherMedias, this._likesSubject);
    Sorter.render();

    /* Pour chaque media correspondant à un photographe sélectionné par son ID */
    mediasDataModel.forEach(media => {
     if (media.photographerId === photographId) {
       /* Ajouter le nombre de likes du media au total des likes */
       totalLikes = totalLikes + media.likes;

       /* Créer un objet template */
       const templateMedia = new MediaCard(media, this._likesSubject, thatPhotograherMedias);

       /* Intégrer le template dans la page du photographe sélectionné */
       this.$galleryWrapper.append(templateMedia.createMediaCard());
     }
    });

    /* Afficher les valeurs de la bannière */
    const bannerTemplate = new BannerTemplate(totalLikes, pricePhotographer)
    this.$bannerWrapper.append(bannerTemplate.createBanner());

  }
}

const main = new Main();
main.init();