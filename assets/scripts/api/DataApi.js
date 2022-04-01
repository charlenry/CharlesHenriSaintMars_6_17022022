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
      .then(response => {
        if(response.ok) return response.json();
        else throw new Error(response.statusText);
      })
      .then(data => {
        return (data.photographers);
      })
      .catch(error => {
        console.log(`HTTP Error: ${error.message}`);
      });
  }

  async getMedias() {
    return fetch(this._url)
    .then(response => {
      if(response.ok) return response.json();
      else throw new Error(response.statusText);
    })
    .then(data => {
      return (data.media);
    })
    .catch(error => {
      console.log(`HTTP Error: ${error.message}`);
    });
  }
}

//export default DataApi;
