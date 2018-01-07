'use strict';

var _ = require('underscore'),
    template = require('./tab-bar.html'),
    TabButton = require('../tab-button/TabButton');

module.exports = {

   template: template,

   components: {
      'tab-button': TabButton,
   },

   props: {
      items: {},
   },

   data: function() {
      return {
         selectedIndex: 0,
      };
   },

   methods: {

      onItemClicked: function(action) {
         this.selectedIndex = _.findIndex(this.items, { action: action });
         this.$emit('itemSelected', action);
      },

   },

};
