'use strict';

var template = require('./navigation-bar.html'),
    NavigationButton = require('../navigation-button/NavigationButton');


module.exports = {

   template: template,

   components: {
      'navigation-button': NavigationButton,
   },

   props: [ 'items' ],

   methods: {

      onNavItemClicked: function(action) {
         this.$emit('navItemClicked', action);
      },

   },

};
