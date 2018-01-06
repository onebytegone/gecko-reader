'use strict';

var Vue = require('vue'),
    VueRouter = require('vue-router'),
    template = require('./app.html'),
    NavigationBar = require('../components/navigation-bar/NavigationBar'),
    ChapterPicker = require('../components/panels/chapter-picker/ChapterPicker'),
    ReadingPanel = require('../components/panels/reading-panel/ReadingPanel');

Vue.use(VueRouter);

module.exports = Vue.extend({

   template: template,

   router: new VueRouter({
      routes: [
         { path: '/chapter', component: ChapterPicker },
         { path: '/reading', component: ReadingPanel },
      ],
   }),

   components: {
      'navigation-bar': NavigationBar,
   },

   data: function() {
      return {
         navigationItems: [
            { title: 'Home', action: '/chapter' },
            { title: 'Read', action: '/reading' },
         ],
      };
   },

});
