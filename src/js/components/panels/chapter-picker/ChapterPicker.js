'use strict';

var template = require('./chapter-picker.html');

module.exports = {

   template: template,

   computed: {

      book: function() {
         return this.$store.getters.book;
      },

   },

};
