/**
 * Nom du fichier : assets\scripts\data-models\PhotographerDataModel.js
 * Fonction : Objet qui met en forme les données (modèle de données) avant la présentation à un objet template.
 * Design Pattern : Constructor Pattern
 * Auteur(s) : Charles-Henri Saint-Mars
**/

"use strict";

class PhotographerDataModel {
  /**
   * @param {object} data 
  **/
  constructor(data) {
    this._name = data.name;
    this._id = data.id;
    this._city = data.city;
    this._country = data.country;
    this._tagline = data.tagline;
    this._price = data.price;
    this._portrait = data.portrait;
    this._description = data.description;
  }

  get name() {
    return this._name;
  }

  get id() {
    return this._id;
  }

  get city() {
    return this._city;
  }

  get country() {
    return this._country;
  }

  get tagline() {
    return this._tagline;
  }

  get price() {
    return this._price;
  }

  get portrait() {
    return `assets/images/photographers/${this._portrait}`;
  }

  get thumbnail() {
    return `assets/images/photographers/thumbnails/${this._portrait}`;
  }

  get description() {
    return this._description;
  }

}

//export default PhotographerDataModel;
