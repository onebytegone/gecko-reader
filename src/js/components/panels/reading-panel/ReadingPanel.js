'use strict';

var _ = require('underscore'),
    template = require('./reading-panel.html');

module.exports = {

   template: template,

   computed: {

      chapter: function() {
         return this.$store.state.chapter;
      },

      verseNumber: function() {
         return this.$store.state.verseNumber;
      },

   },

   methods: {

      onChapterScroll: _.throttle(function() {
         var verseVisibleTopBuffer = Math.max(document.documentElement.clientHeight, window.innerHeight) * 0.18,
             verseVisibleTargetHeight = Math.max(document.documentElement.clientHeight, window.innerHeight) * 0.5;

         var currentlyVisibleVerse = _.reduce(this.$refs.chapterText.children, function(memo, el) {
            var boundingRect = el.getBoundingClientRect();

            if (!memo) {
               if (boundingRect.top >= verseVisibleTopBuffer && boundingRect.top <= verseVisibleTopBuffer + verseVisibleTargetHeight) {
                  // verse starts in the top section of the screen
                  memo = el;
               } else if (boundingRect.bottom > verseVisibleTopBuffer && boundingRect.bottom - verseVisibleTopBuffer >= verseVisibleTargetHeight/2) {
                  //  boundingRect.top <= verseVisibleTopBuffer && boundingRect.bottom >= verseVisibleTargetHeight
                  // verse spans most of the target area
                  memo = el;
               }
            }

            return memo;
         }, false);

         // TODO: create actual verse parsing util
         this.$store.commit('setVerseNumber', parseInt(currentlyVisibleVerse.id.slice(-3), 10));
      }, 100),

   },

};
