'use strict';

var template = require('./reading-panel.html'),
    geckoAPI = require('../../../api/gecko');

module.exports = {

   template: template,

   data: function() {
      return {
         chapter: undefined,
      };
   },

   computed: {

      book: function() {
         return this.$store.getters.book;
      },

   },

   methods: {

      fetchData: function() {
         var chapterNum = this.$store.state.route.params.chapter,
             bookNum, startVs, endVs;

         if (this.$store.state.edition && this.$store.getters.book) {
            bookNum = this.$store.getters.book.bookNum;
            startVs = geckoAPI.makeVerseIdentifer(bookNum, chapterNum, 0);
            endVs = geckoAPI.makeVerseIdentifer(bookNum, chapterNum, 999);

            geckoAPI.fetchVerses(this.$store.state.edition.contentAPI, startVs, endVs)
               .then(function(chapterData) {
                  this.chapter = chapterData;
               }.bind(this))
               .done();
         }
      },

   },

   created: function() {
      // Reload chapter initial page creation
      this.fetchData();
   },

   watch: {

      book: function() {
         // Reload chapter on book change
         this.fetchData();
      },

   },

};
