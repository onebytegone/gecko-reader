'use strict';

var Vue = require('vue'),
    VueRouter = require('vue-router'),
    VuexRouterSync = require('vuex-router-sync'),
    template = require('./app.html'),
    store = require('../store/index'),
    NavigationBar = require('../components/navigation-bar/NavigationBar'),
    BookPicker = require('../components/panels/book-picker/BookPicker'),
    ChapterPicker = require('../components/panels/chapter-picker/ChapterPicker'),
    ChapterPanel = require('../components/panels/chapter-panel/ChapterPanel'),
    router;

Vue.use(VueRouter);

router = new VueRouter({
   routes: [
      {
         path: '/',
         name: 'bookSelection',
         component: BookPicker,
      },
      {
         path: '/:book',
         name: 'chapterSelection',
         component: ChapterPicker,
      },
      {
         path: '/:book/:chapter',
         name: 'chapterPanel',
         component: ChapterPanel,
      },
   ],
});

VuexRouterSync.sync(store, router);

module.exports = Vue.extend({

   template: template,
   router: router,
   store: store,

   components: {
      'navigation-bar': NavigationBar,
   },

   data: function() {
      return {
         navigationItems: [
            { title: 'Home', icon: 'fa-home', route: { name: 'bookSelection' } },
         ],
         textScale: 'text-scale-ten',
      };
   },

   created: function() {
      this.$store.dispatch('fetchLanguages')
         .then(function() {
            return this.$store.dispatch('fetchEdition', 'nwtsty');
         }.bind(this))
         .done();
   },

});
