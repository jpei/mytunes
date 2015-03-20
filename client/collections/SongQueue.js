// SongQueue.js - Defines a backbone model class for the song queue.
var SongQueue = Songs.extend({

  initialize: function(){
  },
  add: function() {
  	Songs.prototype.add.apply(this,arguments);
  	if(this.length===1) {
  		this.playFirst();
  	}
    this.save();
  },
  remove: function() {
    Songs.prototype.remove.apply(this,arguments);
    this.save();
  },
  playFirst: function() {
    if (this.length > 0) {
      this.at(0).play();
    }
  },
  donePlaying: function() {
  	this.shift();
  	this.playFirst();
  },
  save: function() {
    if (window.localStorage) {
      var storage = {};
      var songsJSON = this.toJSON();
      for (var i=0; i<songsJSON.length; i++) {
        storage[JSON.stringify(songsJSON[i])] = true;
      }
      window.localStorage.songQueue = JSON.stringify(storage);
    }
  },


});