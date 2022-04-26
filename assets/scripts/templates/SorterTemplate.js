/**
 * Nom du fichier : assets\scripts\templates\SorterTemplate.js
 * Fonction : Sorter Template (modèle d'affichage du tri des medias des photographes)
 * Auteur(s) : Charles-Henri Saint-Mars
**/

"use strict";

class SorterTemplate {
  /**
   * @param {object} medias
   * @param {object} likesSubject
  **/

  constructor(medias, likesSubject) {
    this._medias = medias;  /* identique à thatPhotograherMedias */
    this._likesSubject = likesSubject;
    this.$wrapper = document.createElement('div');
    this.$sorterWrapper = document.querySelector('.sorter-wrapper')
    this.$galleryWrapper = document.querySelector('.gallery-wrapper')
    this.ProxyCachingSorter = new ProxyCachingSorter();
  }

  async sorterMedias(sorter) {
    this.clearMediasWrapper();

    if (sorter) {
      const sortedData = await this.ProxyCachingSorter.getSorterCached(this._medias, sorter);
      sortedData.medias.forEach(media => {
        const mediaTemplate = new MediaCard(media, this._likesSubject, this._medias);
        this.$galleryWrapper.appendChild(mediaTemplate.createMediaCard());
      });
    } else {
      this._medias.forEach(media => {
        const mediaTemplate = new MediaCard(media, this._likesSubject, this._medias);
        this.$galleryWrapper.appendChild(mediaTemplate.createMediaCard());
      });
    }
  }

  onChangeSorter() {
    const that = this;
    this.$wrapper
      .querySelector('form')
      .addEventListener('change', function(e) {
        const sorter = e.target.value
        that.sorterMedias(sorter)
      });
  }

  clearMediasWrapper() {
    this.$galleryWrapper.innerHTML = "";
  }

  render() {
    const sorterForm = `
      <form action="#" method="POST" class="sorter-form">
        <label for="sorter-select">Triez par : </label>
        <select name="sorter-select" id="sorter-select" class="sorter-select">
          <option value="">Aucun tri</option>
          <option value="POP">Popularité</option>
          <option value="TITRE">Titre</option>
        </select>
      </form>
    `;
    this.$wrapper.innerHTML = sorterForm;
    this.onChangeSorter();
    this.$sorterWrapper.appendChild(this.$wrapper)
  }
}

//export default SorterTemplate;