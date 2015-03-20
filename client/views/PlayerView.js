// PlayerView.js - Defines a backbone view class for the music player.
var PlayerView = Backbone.View.extend({

  // HTML5 (native) audio tag is being used
  // see: https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Using_HTML5_audio_and_video
  el: '<audio controls autoplay />',

  initialize: function() {
    if (window.localStorage) {
      this.el.volume = JSON.parse(window.localStorage.volume || "1");
      this.el.muted = JSON.parse(window.localStorage.muted || "false");
    }
    var self = this;
    this.el.onvolumechange = function() {
      window.localStorage.volume = JSON.stringify(self.el.volume);
      window.localStorage.muted = JSON.stringify(self.el.muted);
    };
    var keyDown = [false, false]; // space: 32, M: 77, +: 187, -: 189
    $(document).keyup(function(evt) {
      if (evt.keyCode === 32 && keyDown[0]) {
        keyDown[0] = false;
      }
      if (evt.keyCode === 77 && keyDown[1]) {
        keyDown[1] = false;
      }
    });
    $(document).keydown(function(evt) {
      if (evt.keyCode === 32 && !keyDown[0]) {
        keyDown[0] = true;
        self.togglePlay();
      }
      if (evt.keyCode === 77 && !keyDown[1]) {
        keyDown[1] = true;
        self.toggleMute();
      }
      if (evt.keyCode === 187) {
        self.increaseVolume();
      }
      if (evt.keyCode === 189) {
        self.decreaseVolume();
      }
    });
  },

  events: {
    ended: function() { this.model.ended(); },
  },

  setSong: function(song){
    this.model = song;
    this.render();
  },

  render: function() {
    return this.$el.attr('src', this.model ? this.model.get('url') : '');
  },

  togglePlay: function() {
    if (this.el.paused){
      this.el.play();
    }
    else { this.el.pause(); }
  },

  toggleMute: function() {
    this.el.muted = !this.el.muted;
  },

  increaseVolume: function() {
    if (this.el.volume <= .98)
      this.el.volume += .02;
    else this.el.volume = 1;
    this.el.muted = false;
  },

  decreaseVolume: function() {
    if (this.el.volume >= .02)
      this.el.volume -= .02;
    else this.el.volume = 0;
    this.el.muted = false;
  },

});
