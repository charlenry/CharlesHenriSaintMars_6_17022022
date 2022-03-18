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

  createPhotographerData() {
    const $h1 = $("<h1></h1>").html(`${this._photographer.name}`);
    const $h2 = $("<h2></h2>").html(`${this._photographer.city}, ${this._photographer.country}`);
    const $p = $("<p></p>").html(`${this._photographer.tagline}`);
    const $div = $("<div></div>").append($h1, $h2, $p);
    return [$h1, $h2, $p];
  }
}