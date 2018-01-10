'use strict';

var template = require('./navigation-bar.html'),
    TabButton = require('../tab-button/TabButton')
;

module.exports = {

   template: template,

   components: {
      'tab-button': TabButton,
   },

   props: [ 'items' ],

   methods: {

      onNavItemClicked: function(name) {
         this.$emit('navItemClicked', name);
      },

   },

};
