"use strict";
//Factory pattern
//Cet objet permet de choisir l'objet de mise en forme des données en fonction de leur type.

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