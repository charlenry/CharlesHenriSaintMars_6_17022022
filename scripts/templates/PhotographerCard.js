"use strict";
//Photographer Card Template
//Cet objet organise l'affichage des données sur les photographes.

class PhotographerCard {
  /**
   * @param {object} photographer
  **/
  constructor(photographer) {
      this._photographer = photographer;
  }

  createPhotographerCard() {
    const $article = document.createElement( 'article' );

    const photographerCard = `
      <img src="${this._photographer.portrait}" alt="Photo de ${name}"> 
      <h2>${this._photographer.name}</h2>
      <h3>${this._photographer.city}, ${this._photographer.country}</h3> 
      <p>${this._photographer.tagline}</p> 
      <p>${this._photographer.price}€/jour</p> 
    `;
    $article.innerHTML = photographerCard;
    return ($article);
  }
}