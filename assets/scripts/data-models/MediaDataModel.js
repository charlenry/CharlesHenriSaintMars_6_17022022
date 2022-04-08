/**
 * Nom du fichier : assets\scripts\data-models\MediaDataModel.js
 * Fonction : Objet qui met en forme les données (modèle de données) avant la présentation à un objet template.
 * Design Pattern : Constructor Pattern
 * Auteur(s) : Charles-Henri Saint-Mars
**/

"use strict";

class MediaDataModel {
  /**
   * @param {object} media 
  **/
  constructor(media) {
    this._id = media.id;
    this._photographerId = media.photographerId;
    this._title = media.title;
    this._image = media.image;
    this._video = media.video;
    this._likes = media.likes;
    this._date = media.date;
    this._price = media.price;
  }

  get id() {
    return this._id;
  }

  get photographerId() {
    return this._photographerId;
  }

  get title() {
    return this._title;
  }

  get image() {
    if (this._image != undefined) {
      return `assets/images/photos/${this._image}`;
    } else {
      return '';
    }
  }

  get thumbnail() {
    if (this._image != undefined) {
      return `assets/images/photos/thumbnails/${this._image}`;
    } else {
      return '';
    }
  }

  get video() {
    if (this._video != undefined) {
      return `assets/images/videos/${this._video}`;
    } else {
      return '';
    }
  }

  get videoThumbnail() {
    if (this._video != undefined) {
      let videoName = this._video.slice(0, -4);
      return `assets/images/videos/thumbnails/${videoName}.jpg`;
    } else {
      return '';
    }
  }



  get likes() {
    return this._likes;
  }
  
  get date() {
    return this._date;
  }
  
  get price() {
    return this._price;
  }
}

//export default MediaDataModel;