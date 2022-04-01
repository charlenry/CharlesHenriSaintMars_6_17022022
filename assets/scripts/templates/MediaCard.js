"use strict";
//Media Card Template
//Cet objet organise l'affichage des media des photographes.

class MediaCard {
  /**
   * @param {object} media
  **/
  constructor(media) {
      this._media = media;
      this.$wrapper = document.createElement('div');
      this.$wrapper.classList.add('media-card-wrapper');
  }

  createMediaCard() {
    if(this._media.thumbnail.endsWith(".jpg")) {  /* Si c'est une image */
      const mediaCard = `
        <figure>
          <img src="${this._media.thumbnail}" alt="${this._media.title}" role="button">
          <div>
            <figcaption class="caption">${this._media.title}</figcaption>
            <span class="likes" id="likes-${this._media.id}">${this._media.likes}</span>
            <span class="coeur" id="coeur-${this._media.id}"><i class="fas fa-heart"></i></span>
          </div>
        </figure>
      `;
      
     this.$wrapper.innerHTML = mediaCard;
     return this.$wrapper;
    } else if(this._media.video.endsWith(".mp4")) {  /* Si c'est une vidéo */
      const mediaCard = `
        <div class="video-wrapper">
          <video controls preload="metadata">
            <source src="${this._media.video}" type="video/mp4" role="button">
            Your browser does not support HTML video.
          </video>
          <div>
            <span class="caption">${this._media.title}</span>
            <span class="likes" id="likes-${this._media.id}">${this._media.likes}</span>
            <span class="coeur" id="coeur-${this._media.id}"><i class="fas fa-heart"></i></span>
          </div>
        </div>
      `;

      this.$wrapper.innerHTML = mediaCard;
      return this.$wrapper;
    } else {
      throw "Error : Unknown media type";
    }

  }
}

//export default MediaCard;