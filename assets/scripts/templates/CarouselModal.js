/**
 * Nom du fichier : assets\scripts\templates\CarouselModal.js
 * Fonction :  Afficher un carrousel dans un modal au clic sur chaque media
 * Auteur(s) : Charles-Henri Saint-Mars
**/

class CarouselModal {
  constructor(media, thatPhotograherMedias) {
    this._media = media;
    this._thatPhotograherMedias = thatPhotograherMedias;
    this._mediaIndex = this._thatPhotograherMedias.indexOf(this._thatPhotograherMedias.find(media => media.id === this._media.id));
    this._totalMedias = this._thatPhotograherMedias.length;
    
    this.$wrapper = document.createElement('div');
    this.$wrapper.classList.add('carousel-wrapper');
    this.$modalWrapper = document.querySelector('.modal');
    this.$previousMedia = document.querySelector('.prev');
    this.$nextMedia = document.querySelector('.next');
  }

  onPreviousMedia() {
    this.$wrapper
      .querySelector('.prev')
      .addEventListener('click', () => {
        if (this._mediaIndex > 0) {
          this._mediaIndex -= 1;
          
          if (this._thatPhotograherMedias[this._mediaIndex].image) {
            this.displayCarousel('img', this._thatPhotograherMedias[this._mediaIndex].image, this._thatPhotograherMedias[this._mediaIndex].title);
          } else if (this._thatPhotograherMedias[this._mediaIndex]._video) {
            this.displayCarousel('video', this._thatPhotograherMedias[this._mediaIndex].video, this._thatPhotograherMedias[this._mediaIndex].title);
          }
        } else if (this._mediaIndex <= 0) {
          this._mediaIndex = this._totalMedias - 1;
          
          if (this._thatPhotograherMedias[this._mediaIndex].image) {
            this.displayCarousel('img', this._thatPhotograherMedias[this._mediaIndex].image, this._thatPhotograherMedias[this._mediaIndex].title);
          } else if (this._thatPhotograherMedias[this._mediaIndex]._video) {
            this.displayCarousel('video', this._thatPhotograherMedias[this._mediaIndex].video, this._thatPhotograherMedias[this._mediaIndex].title);
          }
        }
      });
  }

  onNextMedia() {
    this.$wrapper
      .querySelector('.next')
      .addEventListener('click', () => {
        if (this._mediaIndex < this._totalMedias - 1) {
          this._mediaIndex += 1;

          if (this._thatPhotograherMedias[this._mediaIndex].image) {
            this.displayCarousel('img', this._thatPhotograherMedias[this._mediaIndex].image, this._thatPhotograherMedias[this._mediaIndex].title);
          } else if (this._thatPhotograherMedias[this._mediaIndex]._video) {
            this.displayCarousel('video', this._thatPhotograherMedias[this._mediaIndex].video, this._thatPhotograherMedias[this._mediaIndex].title);
          }
        } else if (this._mediaIndex >= this._totalMedias - 1) {
          this._mediaIndex = 0;

          if (this._thatPhotograherMedias[this._mediaIndex].image) {
            this.displayCarousel('img', this._thatPhotograherMedias[this._mediaIndex].image, this._thatPhotograherMedias[this._mediaIndex].title);
          } else if (this._thatPhotograherMedias[this._mediaIndex]._video) {
            this.displayCarousel('video', this._thatPhotograherMedias[this._mediaIndex].video, this._thatPhotograherMedias[this._mediaIndex].title);
          }
        }
      });
  }

  onCloseButton() {
    this.$wrapper
      .querySelector('.close-btn')
      .addEventListener('click', () => {
        this.$modalWrapper.classList.remove('modal-on');
        this.$wrapper.innerHTML = "";
      });
  }

  displayCarousel(type, media, title) {
    let carousel ;

    if(type === 'img') {  /* Si c'est une image */
      carousel = `
        <div class="carousel">
          <span aria-label="Précédent" class="arrow prev cursor" tabindex="0" role="button"><img src="assets/images/icons/chevron-left-solid.svg"></span>
          <figure>
            <img src="${media}" alt="${title}" aria-label="photo titrée: ${title} "tabindex="0">
            <div>
              <figcaption class="caption">${title}</figcaption>
            </div>
          </figure>
          <span aria-label="Suivant" class="arrow next cursor" tabindex="0" role="button"><img src="assets/images/icons/chevron-right-solid.svg"></span>
          <span class="close-btn cursor" tabindex="0" role="button"><img src="assets/images/icons/xmark-solid.svg"><span>
        </div>
      `;

    } else if(type === 'video') {  /* Si c'est une vidéo */
      carousel = `
        <div class="carousel">
          <span aria-label="Précédent" class="arrow prev cursor" tabindex="0" role="button"><img src="assets/images/icons/chevron-left-solid.svg"></span>
          <video src="${media}" type="video/mp4" controls tabindex="0" aria-label="vidéo titrée: ${title}">
            Your browser does not support HTML video.
          </video>
          <div>
            <span class="caption">${title}</span> 
          </div>
          <span aria-label="Suivant" class="arrow next cursor" tabindex="0" role="button"><img src="assets/images/icons/chevron-right-solid.svg"></span>
          <span class="close-btn cursor" tabindex="0" role="button"><img src="assets/images/icons/xmark-solid.svg"><span>
        </div>
      `;
    }

    this.$wrapper.innerHTML = carousel;

    this.onPreviousMedia();
    this.onNextMedia();
    this.onCloseButton();
  }

  createCarousel() {
    if(this._media.image) {  /* Si c'est une image */
    this.displayCarousel('img', this._media.image, this._media.title);
    } else if(this._media.video) {  /* Si c'est une vidéo */
    this.displayCarousel('video', this._media.video, this._media.title);
    }

    this.$modalWrapper.classList.add('modal-on');
    this.$modalWrapper.appendChild(this.$wrapper);

    this.onPreviousMedia();
    this.onNextMedia();
    this.onCloseButton();

  }

  render() {
      this.createCarousel();
  }
}