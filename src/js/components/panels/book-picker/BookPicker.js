'use strict';

var _ = require('underscore'),
    template = require('./book-picker.html');

module.exports = {

   template: template,

   computed: {

      books: function() {
         var edition = this.$store.state.edition;

         if (edition) {
            return _.map(_.extend({}, edition.books), function(book, index) {
               if (index < 5) {
                  book.color = 'colorThree';
               } else if (index < 18) {
                  book.color = 'colorOne';
               } else if (index < 23) {
                  book.color = 'colorTwo';
               } else if (index < 44) {
                  book.color = 'colorThree';
               } else if (index < 45) {
                  book.color = 'colorOne';
               } else if (index < 66) {
                  book.color = 'colorTwo';
               } else {
                  book.color = 'colorThree';
               }

               return book;
            });
         }

         return undefined;
      },

      hebrewBooks: function() {
         return this.books ? this.books.slice(0, 39) : undefined;
      },

      greekBooks: function() {
         return this.books ? this.books.slice(39) : undefined;
      },

   },

};
