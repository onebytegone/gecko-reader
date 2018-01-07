'use strict';

var template = require('./chapter-panel.html'),
    ReadingPanel = require('../reading-panel/ReadingPanel'),
    GemsPanel = require('../gems-panel/GemsPanel'),
    TabButton = require('../../tab-button/TabButton');

module.exports = {

   template: template,

   data: function() {
      return {
         tabs: [
            {
               name: 'text',
               title: 'Text',
               component: ReadingPanel,
            },
            {
               name: 'gems',
               title: 'Gems',
               component: GemsPanel,
            },
         ],
         selectedTabName: 'text',
      };
   },

   components: {
      'tab-button': TabButton,
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

      onTabClick: function(action) {
         this.selectedTabName = action;
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
