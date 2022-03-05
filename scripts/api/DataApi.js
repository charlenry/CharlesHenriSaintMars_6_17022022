"use strict";
// Cet objet se connecte au fichier JSON passé en paramètre et retourne les données selon leur type.

class DataApi {
  /**
   * @param {string} url 
  **/
  constructor(url) {
      this._url = url;
  }

  async getPhotographers() {
    return fetch(this._url)
        .then(res => res.json())
        .then(res => res.photographers)
        .catch(err => console.log('an error occurs', err));
  }

  async getMedia() {
    return fetch(this._url)
      .then(res => res.json())
      .then(res => res.media)
      .catch(err => console.log('an error occurs', err));
  }
}
