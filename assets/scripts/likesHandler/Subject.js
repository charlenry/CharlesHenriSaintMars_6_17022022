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