'use strict';

var template = require('./navigation-controller.html'),
    NavigationBar = require('../navigation-bar/NavigationBar'),
    ChapterPicker = require('../panels/chapter-picker/ChapterPicker'),
    ReadingPanel = require('../panels/reading-panel/ReadingPanel');

module.exports = {

   template: template,

   components: {
      'navigation-bar': NavigationBar,
   },

   data: function() {
      return {
         currentPanel: ChapterPicker,
         navigationItems: [
            { title: 'Home', action: 'goHome' },
            { title: 'Read', action: 'openReading' },
         ],
      };
   },

   methods: {

      showPanel: function(panel) {
         this.currentPanel = panel;
      },

      onNavItemClicked: function(action) {
         if (action === 'goHome') {
            this.currentPanel = ChapterPicker;
         } else if (action === 'openReading') {
            this.currentPanel = ReadingPanel;
         }
      },

   },

};
