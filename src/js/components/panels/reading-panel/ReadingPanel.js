'use strict';

var template = require('./reading-panel.html');

module.exports = {

   template: template,

   computed: {

      chapter: function() {
         return this.$store.state.chapter;
      },

   },

};
