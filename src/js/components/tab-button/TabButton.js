'use strict';

var template = require('./tab-button.html');

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
      isSelected: {
         type: Boolean,
         'default': false,
      },
   },

   methods: {

      onClick: function() {
         this.$emit('click', this.action);
      },

   },

};
