"use strict";
//Photographer Card Template
//Cet objet organise l'affichage des données sur les photographes.

class PhotographerData {
  /**
   * @param {object} photographer
  **/
  constructor(photographer) {
      this._photographer = photographer;
  }

  createPhotographerCard() {
    const $div = document.createElement( 'div' );

    const photographerCard = `
      <h1>${this._photographer.name}</h1>
      <h2>${this._photographer.city}, ${this._photographer.country}</h2> 
      <p>${this._photographer.tagline}</p>  
    `;
    $div.innerHTML = photographerCard;
    return ($div);
  }
}