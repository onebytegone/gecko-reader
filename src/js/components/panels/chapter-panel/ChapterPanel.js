'use strict';

var template = require('./chapter-panel.html'),
    GemsPanel = require('../reading-panel/ReadingPanel'),
    ReadingPanel = require('../gems-panel/GemsPanel'),
    TabBar = require('../../tab-bar/TabBar');

module.exports = {

   template: template,

   data: function() {
      return {
         chapter: undefined,
         tabBarItems: [
            { title: 'text', action: 'text' },
            { title: 'gems', action: 'gems' },
         ],
         selectedPanel: 'text',
      };
   },

   components: {
      'reading-panel': ReadingPanel,
      'gems-panel': GemsPanel,
      'tab-bar': TabBar,
   },

   computed: {

      book: function() {
         return this.$store.getters.book;
      },

   },

   methods: {

      fetchData: function() {
         this.$store.dispatch('fetchChapter', this.$store.state.route.params.chapter).done();
      },

      onItemSelected: function(action) {
         this.selectedPanel = action;
      },

   },

   created: function() {
      // Reload chapter initial page creation
      this.fetchData();
   },

   watch: {

      book: function() {
         // Reload chapter on book change
         this.fetchData();
      },

   },

};
