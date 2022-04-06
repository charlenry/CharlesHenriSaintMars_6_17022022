class LikesCounter {
  constructor() {

  }

  update(action, media) {
    this._likes = parseInt($(`#likes-${media.id}`).text()); 
    this._totalLikes = parseInt($(".total-likes").text());
    
    if (action === 'INC') {
      $(`#likes-${media.id}`).text(this._likes+1);
      $(".total-likes").text(this._totalLikes+1);
    } else if (action === 'DEC') {
      $(`#likes-${media.id}`).text(this._likes-1);
      $(".total-likes").text(this._totalLikes-1);
    } else {
        throw "Unknow action";
    }
  }
}