'use strict';

var template = require('./navigation-button.html');

module.exports = {

   template: template,

   props: {
      title: {
         type: String,
         required: true,
      },
      action: {
         type: String,
      },
   },

   methods: {

      onClick: function() {
         this.$emit('click', this.action);
      },

   },

};
