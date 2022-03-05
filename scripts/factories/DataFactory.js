"use strict";
//Factory pattern
//Cet objet permet de choisir l'objet de mise en forme des données en fonction de leur type.

class DataFactory {
  /**
   * @param {object} data 
   * @param {string} type
  **/
  constructor(data, type) {
    if (type === 'photographer') {
      return new PhotographerDataModel(data);
    } else {
      throw 'Unknown format type'
    }
  }
}