'use strict';

var Class = require('class.extend'),
    Vue = require('vue'),
    VueRouter = require('vue-router'),
    NavigationBar = require('../components/navigation-bar/NavigationBar'),
    ChapterPicker = require('../components/panels/chapter-picker/ChapterPicker'),
    ReadingPanel = require('../components/panels/reading-panel/ReadingPanel');

Vue.use(VueRouter);

module.exports = Class.extend({

   start: function() {
      this.router = new VueRouter({
         routes: [
            { path: '/chapter', component: ChapterPicker },
            { path: '/reading', component: ReadingPanel }
         ],
      });

      this.vm = new Vue({
         router: this.router,
         el: '#app',
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
   },

});
