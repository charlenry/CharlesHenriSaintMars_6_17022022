"use strict";
//Photographer Card Template
//Cet objet organise l'affichage de la photo du photographe.

class PhotographerPortrait {
  /**
   * @param {object} photographer
  **/
  constructor(photographer) {
      this._photographer = photographer;
  }

  showPortrait() {
    const $div = document.createElement( 'div' );

    const photographerPortrait = `
      <img src="${this._photographer.portrait}" alt="Photo de ${this._photographer.name}" role="presentation">
    `;
    $div.innerHTML = photographerPortrait;
    return ($div);
  }
}