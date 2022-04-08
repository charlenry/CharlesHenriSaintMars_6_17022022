/**
 * Nom du fichier : assets\scripts\sorter\Sorter.js
 * Fonction : Effectuer le tri des medias des photographes
 * Auteur(s) : Charles-Henri Saint-Mars
**/

"use strict";

class Sorter {
  static async sort(data, orderBy) {
    console.log("Get from compute");

    if (orderBy === 'POP') {
      return new Promise(resolve => {
        setTimeout(() => {
          /* Tri par popularité = tri décroissant des likes */
          const result = {
              key: orderBy,
              medias: Array.from(data).sort((a, b) => b.likes - a.likes)
          };
          resolve(result)
        }, 0);
      });
    } else if (orderBy === 'TITRE') {
      return new Promise(resolve => {
        setTimeout(() => {
          const result = {
            key: orderBy,
            medias: Array.from(data).sort((a, b) => {
              let x = a.title.toLowerCase();
              let y = b.title.toLowerCase();
              if (x < y) {return -1;};
              if (x > y) {return 1;};
              return 0;
            })
          };
          resolve(result);
        }, 0);
      });
    } else {
        throw 'unknow orderBy type';
    }
  }
}
