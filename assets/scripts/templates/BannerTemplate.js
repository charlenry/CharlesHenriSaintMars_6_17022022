/**
 * Nom du fichier : assets\scripts\templates\BannerTemplate.js
 * Fonction : Banner Template (modèle d'affichage de la bannière du total de likes et du prix d'un photographe)
 * Auteur(s) : Charles-Henri Saint-Mars
**/

"use strict";

class BannerTemplate {
  /**
   * @param {number} totalLikes
   * @param {number} pricePhotographer
  **/
   constructor(totalLikes, pricePhotographer) {
     this._totalLikes = totalLikes.toLocaleString();
     this._pricePhotographer = pricePhotographer;
   }

   createBanner() {
    const $likesWrapper = $(`<div tabindex="0" class="likes-wrapper"></div>`).html(`
      <span class="total-likes">${this._totalLikes}</span>
      <span aria-label="j'aime au total"class="coeur"><i class="fas fa-heart"></i></span>
    `);
    const $price = $(`<span tabindex="0" class="price"></span>`).text(`${this._pricePhotographer}€/jour`);
    return [$likesWrapper, $price];
   }
}

//export default BannerTemplate;