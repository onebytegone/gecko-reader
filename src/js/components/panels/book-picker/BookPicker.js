'use strict';

var template = require('./book-picker.html');

module.exports = {

   template: template,

   computed: {

      books: function() {
         var edition = this.$store.state.edition;

         return edition.books;
      },

   },

};
