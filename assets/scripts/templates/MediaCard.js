"use strict";
//Media Card Template
//Cet objet organise l'affichage des media des photographes.

class MediaCard {
  /**
   * @param {object} media
   * @param {object} likesSubject
  **/
  constructor(media, likesSubject) {
      this._media = media;
      this._likesSubject = likesSubject;
      
      this.$wrapper = document.createElement('div');
      this.$wrapper.classList.add('media-card-wrapper');
  }

  handleLikeButton() {
    const that = this  /* this = $wrapper */
    
    this.$wrapper
        .querySelector(`#coeur-${this._media.id}`)
        .addEventListener('click', function() {
            if (this.classList.contains('liked')) {
              this.classList.remove('liked');  /* this = élément cliqué */
              that._likesSubject.fire('DEC', that._media);  /* that = $wrapper */
            } else {
              this.classList.add('liked');  /* this = élément cliqué */
              that._likesSubject.fire('INC', that._media);  /* that = $wrapper */
            }
        });
  }

  createMediaCard() {
    if(this._media.thumbnail.endsWith(".jpg")) {  /* Si c'est une image */
      const mediaCard = `
        <figure>
          <img src="${this._media.thumbnail}" alt="${this._media.title}" role=""button tabindex="0">
          <div>
            <figcaption class="caption">${this._media.title}</figcaption>
            <span class="likes" id="likes-${this._media.id}">${this._media.likes}</span>
            <span tabindex="0" class="coeur" id="coeur-${this._media.id}"><i class="fas fa-heart"></i></span>
          </div>
        </figure>
      `;
      
     this.$wrapper.innerHTML = mediaCard;
     this.handleLikeButton();
     return this.$wrapper;
    } else if(this._media.video.endsWith(".mp4")) {  /* Si c'est une vidéo */
      const mediaCard = `
        <div class="video-wrapper" role="button">
          <video preload="metadata" tabindex="0">
            <source src="${this._media.video}" type="video/mp4">
            Your browser does not support HTML video.
          </video>
          <div>
            <span class="caption">${this._media.title}</span>
            <span class="likes" id="likes-${this._media.id}">${this._media.likes}</span>
            <span tabindex="0" class="coeur" id="coeur-${this._media.id}"><i class="fas fa-heart"></i></span>
          </div>
        </div>
      `;

      this.$wrapper.innerHTML = mediaCard;
      this.handleLikeButton();
      return this.$wrapper;
    } else {
      throw "Error : Unknown media type";
    }

  }

}

//export default MediaCard;