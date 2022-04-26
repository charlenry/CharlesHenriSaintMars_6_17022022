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
    $h1.attr('tabindex', '1');
    $h2.attr('tabindex', '1');
    $p.attr('tabindex', '1');
    return [$h1, $h2, $p];
  }
}

//export default PhotographerData;