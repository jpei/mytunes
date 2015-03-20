// SongQueue.js - Defines a backbone model class for the song queue.
var SongQueue = Songs.extend({

  initialize: function() {
    this.loading = [];
    if (window.localStorage && window.localStorage.songQueue) {
      window.onunload = function() {
        var audio = $('audio')[0];
        window.localStorage.currentTime = JSON.stringify(audio.currentTime < audio.duration ? audio.currentTime : 0);
        window.localStorage.paused = JSON.stringify(audio.paused);
      };
      setTimeout((function() {
        for (var i=0; i<this.loading.length; i++) {
          if (this.loading[i]) {
            this.add(this.loading[i]);
          }
        }
        var audio = $('audio')[0];
        audio.currentTime = JSON.parse(window.localStorage.currentTime || "0");
        if (JSON.parse(window.localStorage.paused || "false")) {
          audio.pause();
        }
      }).bind(this), 0);
    }
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
        storage[JSON.stringify(songsJSON[i])] = i;
      }
      window.localStorage.songQueue = JSON.stringify(storage);
    }
  },
  load: function(index, song) {
    this.loading[index] = song;
  }
});
