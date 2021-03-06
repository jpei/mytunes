// SongQueueView.js - Defines a backbone view class for the song queue.
var SongQueueView = Backbone.View.extend({

  tagName: "table",

  initialize: function() {
    this.listenTo(this.model, 'ended', function() {
      this.model.donePlaying();
      this.$el.find('tr').first().remove()
    }, this);

    this.listenTo(this.model, 'dequeue', function(song) {
      this.$el.find('tr:contains(' + song.get("artist") + '):contains(' + song.get("title") + ')')
              .remove();
      if(this.model.at(0)===song) {
        var audio = $('audio')[0];
        audio.pause();
        audio.currentTime = 0;
        this.model.donePlaying();
      } else {
        this.model.remove(song);
      }
    }, this);

    this.listenTo(this.model, 'add', function(song) {
      this.$el.append(new SongQueueEntryView({model: song}).render());
    }, this);

    this.$el.html('<th>Queue</th>');
    this.render();
  },

  render: function() {
    return this.$el;
  },

});
