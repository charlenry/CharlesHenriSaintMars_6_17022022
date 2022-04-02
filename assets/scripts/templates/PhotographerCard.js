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
      <a href="photographer.html?id=${this._photographer.id}">
        <img src="${this._photographer.thumbnail}" alt="Photo de ${this._photographer.name}" role="presentation"> 
        <h2>${this._photographer.name}</h2>
      </a>
      <h3>${this._photographer.city}, ${this._photographer.country}</h3> 
      <p>${this._photographer.tagline}</p> 
      <p>${this._photographer.price}€/jour</p> 
    `;
    $article.innerHTML = photographerCard;
    return $article;
  }
}

//export default PhotographerCard;