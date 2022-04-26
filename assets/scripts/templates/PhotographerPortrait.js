/**
 * Nom du fichier : assets\scripts\templates\PhotographerPortrait.js
 * Fonction : Photographer Portrait Template (modèle d'affichage du portrait des photographes)
 * Auteur(s) : Charles-Henri Saint-Mars
**/

"use strict";

class PhotographerPortrait {
  /**
   * @param {object} photographer
  **/
  constructor(photographer) {
      this._photographer = photographer;
  }

  showPortrait() {
    const $img = $('<img>', {
      src: `${this._photographer.portrait}`, 
      alt: `Photo de ${this._photographer.name}`,
      role: 'img',
      tabindex: '0',
      'aria-label': `${this._photographer.description}`
    });

  //  $img.attr('aria-label', `${this._photographer.description}`);

    return $img;
  }
}

//export default PhotographerPortrait;