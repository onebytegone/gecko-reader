'use strict';

var Class = require('class.extend'),
    Vue = require('vue'),
    NavigationController = require('../components/navigation-controller/NavigationController');

module.exports = Class.extend({

   start: function() {
      this.vm = new Vue({
         el: '#app',
         components: {
            'navigation-controller': NavigationController,
         },
      });
   },

});
