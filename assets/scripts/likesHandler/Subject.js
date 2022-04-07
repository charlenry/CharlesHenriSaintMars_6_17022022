/**
 * Nom du fichier : assets\scripts\likesHandler\Subject.js
 * Fonction : Objet qui maintient la liste des observers. Il notifie aussi aux observers ses changements d'état.
 * Design Pattern : Observer Pattern (sujet/publisher)
 * Auteur(s) : Charles-Henri Saint-Mars
**/

"use strict";
class LikesSubject {
  constructor() {
    this._observers = [];
  }

  subscribe(observer) {
    this._observers.push(observer);
  }

  unsubscribe(observer) {
    this._observers = this._observers.filter(obs => obs !== observer);
  }

  set media(media) {
    this._media = media;
  }

  fire(action, media) {
    this._observers.forEach(observer => observer.update(action, media));
  }
}