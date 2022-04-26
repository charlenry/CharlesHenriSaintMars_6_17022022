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
   * @param {object} thatPhotograherMedias
  **/

  constructor(media, likesSubject, thatPhotograherMedias) {
      this._media = media;
      this._likesSubject = likesSubject;
      this._thatPhotograherMedias = thatPhotograherMedias;
     
      this.$wrapper = document.createElement('div');
      this.$wrapper.classList.add('media-card-wrapper');
      this.$main = document.querySelector('#main');
  }

  handleLikeButton() {
    const that = this;  /* this = $wrapper */
    
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
          if (e.key === "Enter") {
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

  addCarouselForImg() {
    const that = this;

    this.$wrapper
      .querySelector('img')
      .addEventListener('click', function() {
        const carousel = new CarouselModal(that._media, that._thatPhotograherMedias);
        that.$main.ariaHidden = "true";
        carousel.render();
      });

      this.$wrapper
      .querySelector('img')
      .addEventListener('keydown', function(e) {
        if (e.key === "Enter") {
          const carousel = new CarouselModal(that._media, that._thatPhotograherMedias);
          that.$main.ariaHidden = "true";
          carousel.render();
        }
      });
  }

  addCarouselForVideo() {
    const that = this;

    this.$wrapper
      .querySelector('video')
      .addEventListener('click', function() {
        const carousel = new CarouselModal(that._media, that._thatPhotograherMedias);
        that.$main.ariaHidden = "true";
        carousel.render();
      });

      this.$wrapper
      .querySelector('video')
      .addEventListener('keydown', function(e) {
        if (e.key === "Enter") {
          const carousel = new CarouselModal(that._media, that._thatPhotograherMedias);
          that.$main.ariaHidden = "true";
          carousel.render();
        }
      });
  }


  createMediaCard() {
    if(this._media.thumbnail) {  /* Si c'est une image */
      const mediaCard = `
        <figure>
          <img class="hover-shadow cursor" src="${this._media.thumbnail}" alt="${this._media.title}" aria-label="photo titrée: ${this._media.title} "tabindex="0">
          <div>
            <figcaption class="caption">${this._media.title}</figcaption>
            <div class="legend-likes" tabindex="0" role="button">
              <span class="likes" id="likes-${this._media.id}">${this._media.likes}</span>
              <span aria-label="j'aime" class="coeur" id="coeur-${this._media.id}"><span aria-label="Tapez entrée pour mettre j'aime ou annuler j'aime à la photo" role="button" tabindex="0"><i class="fas fa-heart"></i></span></span>
            </div>
          </div>
        </figure>
      `;
      
     this.$wrapper.innerHTML = mediaCard;
     this.handleLikeButton();
     this.addCarouselForImg();
     return this.$wrapper;
    } else if(this._media.video) {  /* Si c'est une vidéo */
      const mediaCard = `
        <div class="video-wrapper">
          <video class="hover-shadow cursor" poster="${this._media.videoThumbnail}" tabindex="0" aria-label="vidéo titrée: ${this._media.title}">
            <source src="${this._media.video}" type="video/mp4">
            Your browser does not support HTML video.
          </video>
          <div>
            <span class="caption">${this._media.title}</span>
            <div class="legend-likes" tabindex="0" role="button">
              <span class="likes" id="likes-${this._media.id}">${this._media.likes}</span>
              <span aria-label="j'aime" class="coeur" id="coeur-${this._media.id}"><span aria-label="Tapez entrée pour mettre j'aime ou annuler j'aime à la vidéo" role="button" tabindex="0"><i class="fas fa-heart"></i></span></span>
            </div>
          </div>
        </div>
      `;

      this.$wrapper.innerHTML = mediaCard;
      this.handleLikeButton();
      this.addCarouselForVideo();
      return this.$wrapper;
    } else {
      throw "Error : Unknown media type";
    }

  }

}

//export default MediaCard;