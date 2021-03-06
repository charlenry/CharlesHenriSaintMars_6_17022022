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

    this.$wrapper__desc = document.createElement('div');
    this.$wrapper__desc.classList.add('modal-wrapper__desc-carousel');
    this.$wrapper__desc.title = "Ouverture de la lightbox. Vous pouvez naviguer entre les médias avec les flèches gauche et droite du clavier et fermer la lightbox avec la touche Échap. Appuyez sur Tab pour continuer.";
    this.$wrapper__desc.tabIndex = "0";

    this.$modalWrapper = document.querySelector('.modal-wrapper');
    this.$modalWrapper.appendChild(this.$wrapper__desc);
    
    this.$previousMedia = document.querySelector('.prev');
    this.$nextMedia = document.querySelector('.next');
    this.$main = document.querySelector('#main');
  }


  onPreviousMedia() {
    const that = this;  /* that = $wrapper */

    this.$wrapper
      .querySelector('.prev')
      .addEventListener('click', function() {
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
        .addEventListener('keydown', function(e) {
          if (e.key === "Enter") {
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
        .addEventListener('keydown', function(e) {
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
      .addEventListener('click', function() {
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
        .addEventListener('keydown', function(e) {
          if (e.key === "Enter") {
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
        .addEventListener('keydown', function(e) {
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
      this.displayMedia('img', this._thatPhotograherMedias[this._mediaIndex].image, this._thatPhotograherMedias[this._mediaIndex].title, this._thatPhotograherMedias[this._mediaIndex].description);
    } else if (this._thatPhotograherMedias[this._mediaIndex]._video) {
      this.displayMedia('video', this._thatPhotograherMedias[this._mediaIndex].video, this._thatPhotograherMedias[this._mediaIndex].title, this._thatPhotograherMedias[this._mediaIndex].description, this._thatPhotograherMedias[this._mediaIndex].videoSubtitle);
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
      .addEventListener('click', function() {
        that.$modalWrapper.classList.remove('modal-carousel-on');
        that.$wrapper__desc.remove();
        that.$wrapper.remove();
        that.$wrapper.innerHTML = "";
        that.$wrapper.ariaHidden = "true";
        that.$main.ariaHidden = "false";
//        that.$main.style.display = "block";
      });

    this.$wrapper
      .querySelector('.close-btn--carousel')
      .addEventListener('keydown', function(e) {
        if (e.key === "Enter") {
          that.$modalWrapper.classList.remove('modal-carousel-on');
          that.$wrapper__desc.remove();
          that.$wrapper.remove();
          that.$wrapper.innerHTML = "";
          that.$wrapper.ariaHidden = "true";
          that.$main.ariaHidden = "false";
//          that.$main.style.display = "block";
        }
      });

    this.$wrapper
      .querySelector('.carousel')
      .addEventListener('keydown', function(e) {
        if (e.key === "Escape") {
          that.$modalWrapper.classList.remove('modal-carousel-on');
          that.$wrapper__desc.remove();
          that.$wrapper.remove();
          that.$wrapper.innerHTML = "";
          that.$wrapper.ariaHidden = "true";
          that.$main.ariaHidden = "false";
//          that.$main.style.display = "block";
        }
      });
  }


  /* Tab management for the carousel modal */
  onTabOutCarouselModal() {
    const that = this;

    this.$wrapper__desc.addEventListener('keydown', function(e) {
      if (e.key === "Tab" && e.shiftKey) {
        e.preventDefault();
        that.$wrapper.querySelector('.close-btn--carousel').focus();
      }
    });
    
    this.$wrapper
      .querySelector('.prev')
      .addEventListener('keydown', function(e) {
        if (e.key === "Tab" && e.shiftKey) {
          e.preventDefault();
          that.$wrapper.querySelector('.close-btn--carousel').focus();
        }
      });

    this.$wrapper
    .querySelector('.close-btn--carousel')
    .addEventListener('keydown', function(e) {
      if (e.key === "Tab") {
        e.preventDefault();
        that.$wrapper.querySelector('.prev').focus();
      }

      if (e.key === "Tab" && e.shiftKey) {
        e.preventDefault();
        that.$wrapper.querySelector('.next').focus();
      }
    });
  }


  displayMedia(type, media, title, description, videoSubtitle) {
    let carouselItem ;

    if(type === 'img') {  /* Si c'est une image */
      carouselItem = `
        <div class="carousel">
          <span aria-label="Média Précédent" class="arrow prev cursor" tabindex="0" role="button"><img src="assets/images/icons/chevron-left-solid.svg"></span>
          <figure>
            <img src="${media}" aria-label="${description}" alt="${title}" aria-label="photo titrée: ${title} "tabindex="0">
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
          <video src="${media}" type="video/mp4" controls tabindex="0" aria-label="${description}">
            <!-- Subtitle files -->
            <track kind="captions" label="Français" srclang="fr" src="${videoSubtitle}" default>
            
            <!-- Fallback for browsers that don't support the <video> element -->          
            <a href="${media}" download>Your browser does not support HTML video - Download the video here</a>
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

  /*  if (this._btnType === 'prev') {
      this.previousBtnFocus();
    } else if (this._btnType === 'next') {
      this.nextBtnFocus();
    } */

    if(type === 'img') {
      this.$wrapper.querySelector('.carousel figure img').focus();
    } else if(type === 'video') {
      this.$wrapper.querySelector('.carousel video').focus();
    }

    this.onPreviousMedia();
    this.onNextMedia();
    this.onCloseButton();
    this.onTabOutCarouselModal();
  }


  createCarousel() {
    if(this._media.image) {  /* Si c'est une image */
    this.displayMedia('img', this._media.image, this._media.title, this._media.description);
    } else if(this._media.video) {  /* Si c'est une vidéo */
    this.displayMedia('video', this._media.video, this._media.title, this._media.description, this._media.videoSubtitle);
    }

    this.$modalWrapper.classList.add('modal-carousel-on');
    this.$modalWrapper.appendChild(this.$wrapper);
//    this.$main.style.display = "none";
//    this.previousBtnFocus();
    this.$wrapper__desc.focus();
  }


  render() {
      this.createCarousel();
  }
}

//export default CarouselModal;