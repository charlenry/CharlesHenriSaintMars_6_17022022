/**
 * Nom du fichier : assets\scripts\proxy\ProxyCachingSorter.js
 * Fonction : Mettre en cache le tri des medias des photographes.
 * Design Pattern : Proxy Pattern
 * Auteur(s) : Charles-Henri Saint-Mars
**/

"use strict";

class ProxyCachingSorter {
  constructor() {
    this.cache = [];
  }

  async getSorterCached(medias, orderBy) {
    const cachedResult = this.cache.find(datum => datum.key === orderBy);
    if (cachedResult) {
      console.log('get from cache');
      return cachedResult;
    }
    const data = await Sorter.sort(medias, orderBy);
    this.cache.push(data);
    return data;
  }
}