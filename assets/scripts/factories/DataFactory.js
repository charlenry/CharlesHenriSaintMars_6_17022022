/**
 * Nom du fichier : assets\scripts\factories\DataFactory.js
 * Fonction : Objet qui permet de choisir l'objet de modélisation des données en fonction de leur type.
 * Design Pattern : Factory Pattern
 * Auteur(s) : Charles-Henri Saint-Mars
**/

"use strict";

/* importation des modules */
//import PhotographerDataModel from "../data-models/PhotographerDataModel.js";
//import PhotographerMediaModel from "../data-models/PhotographerMediaModel.js";

class DataFactory {
  /**
   * @param {object} data 
   * @param {string} type
  **/
  constructor(data, type) {
    if (type === 'photographer') {
      return new PhotographerDataModel(data);
    } else if (type === 'media') {
      return new MediaDataModel(data);
    } else {
      throw 'Unknown format type';
    }
  }
}

//export default DataFactory;