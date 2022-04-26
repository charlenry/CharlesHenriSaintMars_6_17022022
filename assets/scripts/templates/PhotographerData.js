/**
 * Nom du fichier : assets\scripts\templates\PhotographerData.js
 * Fonction : Photographer Data Template (modèle d'affichage des données des photographes)
 * Auteur(s) : Charles-Henri Saint-Mars
**/

"use strict";

class PhotographerData {
  /**
   * @param {object} photographer
  **/
  constructor(photographer) {
      this._photographer = photographer;
  }

  createPhotographerData() {
    const $h1 = $("<h1>").html(`${this._photographer.name}`);
    const $h2 = $("<h2>").html(`${this._photographer.city}, ${this._photographer.country}`);
    const $p = $("<p>").html(`${this._photographer.tagline}`);
    
    $h1.attr({
      'aria-label': `Mon nom : ${this._photographer.name}`,
      tabindex: '1'
    });

    $h2.attr({
      'aria-label': `Ma localité : ${this._photographer.city}, ${this._photographer.country}`,
      tabindex: '1'
    });

    $p.attr({
      'aria-label': `Mon slogan : ${this._photographer.tagline}`,
      tabindex: '1'
    });

    return [$h1, $h2, $p];
  }
}

//export default PhotographerData;