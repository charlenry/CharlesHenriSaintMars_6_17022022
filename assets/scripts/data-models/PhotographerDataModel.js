"use strict";
//Photographer Data Model
//Cet objet met en forme les données (modèle de données) avant la présentation à un objet template.

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
}

//export default PhotographerDataModel;