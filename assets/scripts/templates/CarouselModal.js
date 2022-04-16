/**
 * Nom du fichier : assets\scripts\templates\CarouselModal.js
 * Fonction :  Afficher un carrousel dans un modal au clic sur chaque media
 * Auteur(s) : Charles-Henri Saint-Mars
**/

"use strict";

class CarouselModal {
  constructor(media, thatPhotograherMedias) {
    this._media = media;
    this._thatPhotograherMedias = thatPhotograherMedias;
    this._mediaIndex = this._thatPhotograherMedias.indexOf(this._thatPhotograherMedias.find(media => media.id === this._media.id));
    this._totalMedias = this._thatPhotograherMedias.length;
    this._btnType = "";
    
    this.$wrapper = document.createElement('div');
    this.$wrapper.classList.add('modal-wrapper__carousel');
    this.$wrapper.ariaHidden = "false";
    this.$wrapper.role = "dialog";
    this.$wrapper.ariaLabel = "Ouverture du carrousel";
    this.$wrapper.tabIndex = "0";
    this.$modalWrapper = document.querySelector('.modal-wrapper');
    this.$previousMedia = document.querySelector('.prev');
    this.$nextMedia = document.querySelector('.next');
    this.$main = document.querySelector('#main');
  }


  onPreviousMedia() {
    const that = this;  /* that = $wrapper */

    this.$wrapper
      .querySelector('.prev')
      .addEventListener('click', () => {
        if (that._mediaIndex > 0) {
          that._mediaIndex -= 1;
          that.selectMedia();
        } else if (that._mediaIndex <= 0) {
          that._mediaIndex = that._totalMedias - 1;
          that.selectMedia();
        }
      });

      this.$wrapper
        .querySelector('.prev')
        .addEventListener('keydown', (e) => {
          if (e.key === "Enter" || e.key === " ") {
            that._btnType = 'prev';
            if (that._mediaIndex > 0) {
              that._mediaIndex -= 1;
              that.selectMedia();
            } else if (that._mediaIndex <= 0) {
              that._mediaIndex = that._totalMedias - 1;
              that.selectMedia();
            }
          }
        });

      this.$wrapper
        .querySelector('.carousel')
        .addEventListener('keydown', (e) => {
          if (e.key === "ArrowLeft") {
            that._btnType = 'prev';
            if (that._mediaIndex > 0) {
              that._mediaIndex -= 1;
              that.selectMedia();
            } else if (that._mediaIndex <= 0) {
              that._mediaIndex = that._totalMedias - 1;
              that.selectMedia();
            }
          }
        });
  }


  onNextMedia() {
    const that = this;

    this.$wrapper
      .querySelector('.next')
      .addEventListener('click', () => {
        if (that._mediaIndex < that._totalMedias - 1) {
          that._mediaIndex += 1;
          that.selectMedia();
        } else if (that._mediaIndex >= that._totalMedias - 1) {
          that._mediaIndex = 0;
          that.selectMedia();
        }
      });

      this.$wrapper
        .querySelector('.next')
        .addEventListener('keydown', (e) => {
          if (e.key === "Enter" || e.key === " ") {
            that._btnType = 'next';
            if (that._mediaIndex < that._totalMedias - 1) {
              that._mediaIndex += 1;
              that.selectMedia();
            } else if (that._mediaIndex >= that._totalMedias - 1) {
              that._mediaIndex = 0;
              that.selectMedia();
            }
          }
        });

      this.$wrapper
        .querySelector('.carousel')
        .addEventListener('keydown', (e) => {
          if (e.key === "ArrowRight") {
            that._btnType = 'next';
            if (that._mediaIndex < that._totalMedias - 1) {
              that._mediaIndex += 1;
              that.selectMedia();
            } else if (that._mediaIndex >= that._totalMedias - 1) {
              that._mediaIndex = 0;
              that.selectMedia();
            }
          }
        });
  }


  selectMedia() {
    if (this._thatPhotograherMedias[this._mediaIndex].image) {
      this.displayMedia('img', this._thatPhotograherMedias[this._mediaIndex].image, this._thatPhotograherMedias[this._mediaIndex].title);
    } else if (this._thatPhotograherMedias[this._mediaIndex]._video) {
      this.displayMedia('video', this._thatPhotograherMedias[this._mediaIndex].video, this._thatPhotograherMedias[this._mediaIndex].title);
    }
  }


  previousBtnFocus() {
    this.$wrapper.querySelector('.prev').focus();
  }

  nextBtnFocus() {
    this.$wrapper.querySelector('.next').focus();
  }


  onCloseButton() {
    const that = this;

    this.$wrapper
      .querySelector('.close-btn--carousel')
      .addEventListener('click', () => {
        that.$modalWrapper.classList.remove('modal-carousel-on');
        that.$wrapper.remove();
        that.$wrapper.innerHTML = "";
        that.$wrapper.ariaHidden = "true";
        that.$main.ariaHidden = "false";
      });

      this.$wrapper
        .querySelector('.close-btn--carousel')
        .addEventListener('keydown', (e) => {
          if (e.key === "Enter" || e.key === " ") {
            that.$modalWrapper.classList.remove('modal-carousel-on');
            that.$wrapper.remove();
            that.$wrapper.innerHTML = "";
            that.$wrapper.ariaHidden = "true";
            that.$main.ariaHidden = "false";
          }
        });

      this.$wrapper
        .querySelector('.carousel')
        .addEventListener('keydown', (e) => {
          if (e.key === "Escape") {
            that.$modalWrapper.classList.remove('modal-carousel-on');
            that.$wrapper.remove();
            that.$wrapper.innerHTML = "";
            that.$wrapper.ariaHidden = "true";
            that.$main.ariaHidden = "false";
          }
        });
  }


  displayMedia(type, media, title) {
    let carouselItem ;

    if(type === 'img') {  /* Si c'est une image */
      carouselItem = `
        <div class="carousel">
          <span aria-label="Média Précédent" class="arrow prev cursor" tabindex="0" role="button"><img src="assets/images/icons/chevron-left-solid.svg"></span>
          <figure>
            <img src="${media}" alt="${title}" aria-label="photo titrée: ${title} "tabindex="0">
            <div>
              <figcaption class="caption">${title}</figcaption>
            </div>
          </figure>
          <span aria-label="Média Suivant" class="arrow next cursor" tabindex="0" role="button"><img src="assets/images/icons/chevron-right-solid.svg"></span>
          <span aria-label="Fermer la fenêtre" tabindex="0" role="button" class="close-btn close-btn--carousel"><img src="assets/images/icons/xmark-solid.svg"><span>
        </div>
      `;

    } else if(type === 'video') {  /* Si c'est une vidéo */
      carouselItem = `
        <div class="carousel">
          <span aria-label="Média Précédent" class="arrow prev cursor" tabindex="0" role="button"><img src="assets/images/icons/chevron-left-solid.svg"></span>
          <video src="${media}" type="video/mp4" controls tabindex="0" aria-label="vidéo titrée: ${title}">
            Your browser does not support HTML video.
          </video>
          <div>
            <span class="caption">${title}</span> 
          </div>
          <span aria-label="Média Suivant" class="arrow next cursor" tabindex="0" role="button"><img src="assets/images/icons/chevron-right-solid.svg"></span>
          <span aria-label="Fermer la fenêtre" tabindex="0" role="button" class="close-btn close-btn--carousel"><img src="assets/images/icons/xmark-solid.svg"><span>
        </div>
      `;
    }

    this.$wrapper.innerHTML = carouselItem;

    if (this._btnType === 'prev') {
      this.previousBtnFocus();
    } else if (this._btnType === 'next') {
      this.nextBtnFocus();
    }

    this.onPreviousMedia();
    this.onNextMedia();
    this.onCloseButton();
  }


  createCarousel() {
    if(this._media.image) {  /* Si c'est une image */
    this.displayMedia('img', this._media.image, this._media.title);
    } else if(this._media.video) {  /* Si c'est une vidéo */
    this.displayMedia('video', this._media.video, this._media.title);
    }

    this.$modalWrapper.classList.add('modal-carousel-on');
    this.$modalWrapper.appendChild(this.$wrapper);

  //  this.previousBtnFocus();
    this.$wrapper.focus();
    this.onPreviousMedia();
    this.onNextMedia();
    this.onCloseButton();

  }


  render() {
      this.createCarousel();
  }
}