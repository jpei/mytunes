// SongModel.js - Defines a backbone model class for songs.
var SongModel = Backbone.Model.extend({
  initialize: function() {
    if (window.localStorage && window.localStorage.songQueue) {
      var storage = JSON.parse(window.localStorage.songQueue);
      if(storage[JSON.stringify(this)]) {
        setTimeout(this.enqueue.bind(this), 0);
      }
    }
  },
  play: function(){
    // Triggering an event here will also trigger the event on the collection
    this.trigger('play', this);
  },
  enqueue: function() {
  	// Add a song to queue
  	this.trigger('enqueue', this);
  },
  ended: function() {
  	this.trigger('ended', this);
  },
  dequeue: function() {
    this.trigger('dequeue', this);
  }

});
