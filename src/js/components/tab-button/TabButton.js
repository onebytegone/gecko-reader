'use strict';

var template = require('./tab-button.html');

module.exports = {

   template: template,

   props: {
      title: {
         type: String,
         required: true,
      },
      name: {
         type: String,
      },
   },

   methods: {

      onClick: function() {
         this.$emit('click', this.name);
      },

   },

};
