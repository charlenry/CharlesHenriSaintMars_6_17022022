/**
 * Nom du fichier : assets\scripts\templates\MediaCard.js
 * Fonction : Media Card Template (modèle d'affichage des cartes des medias des photographes)
 * Auteur(s) : Charles-Henri Saint-Mars
**/

"use strict";

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

        this.$wrapper
        .querySelector(`#coeur-${this._media.id}`)
        .addEventListener('keydown', function(e) {
          if (e.keyCode == 13) {
            if (this.classList.contains('liked')) {
              this.classList.remove('liked');  /* this = élément cliqué */
              that._likesSubject.fire('DEC', that._media);  /* that = $wrapper */
            } else {
              this.classList.add('liked');  /* this = élément cliqué */
              that._likesSubject.fire('INC', that._media);  /* that = $wrapper */
            }
          }
        });
  }

  createMediaCard() {
    if(this._media.thumbnail.endsWith(".jpg")) {  /* Si c'est une image */
      const mediaCard = `
        <figure>
          <img src="${this._media.thumbnail}" alt="${this._media.title}" aria-label="photo titrée: ${this._media.title} "tabindex="0">
          <div>
            <figcaption class="caption">${this._media.title}</figcaption>
            <div class="legend-likes" tabindex="0" role="button">
              <span class="likes" id="likes-${this._media.id}">${this._media.likes}</span>
              <span aria-label="j'aime" class="coeur" id="coeur-${this._media.id}"><span aria-label="Tapez entrée ou espace pour mettre j'aime ou annuler j'aime à la photo" role="button" tabindex="0"><i class="fas fa-heart"></i></span></span>
            </div>
          </div>
        </figure>
      `;
      
     this.$wrapper.innerHTML = mediaCard;
     this.handleLikeButton();
     return this.$wrapper;
    } else if(this._media.video.endsWith(".mp4")) {  /* Si c'est une vidéo */
      const mediaCard = `
        <div class="video-wrapper">
          <video preload="metadata" tabindex="0" aria-label="vidéo titrée: ${this._media.title}">
            <source src="${this._media.video}" type="video/mp4">
            Your browser does not support HTML video.
          </video>
          <div>
            <span class="caption">${this._media.title}</span>
            <div class="legend-likes" tabindex="0" role="button">
              <span class="likes" id="likes-${this._media.id}">${this._media.likes}</span>
              <span aria-label="j'aime" class="coeur" id="coeur-${this._media.id}"><span aria-label="Tapez entrée ou espace pour mettre j'aime ou annuler j'aime à la vidéo" role="button" tabindex="0"><i class="fas fa-heart"></i></span></span>
            </div>
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