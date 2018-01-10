'use strict';

var _ = require('underscore'),
    Vue = require('vue'),
    VueRouter = require('vue-router'),
    VuexRouterSync = require('vuex-router-sync'),
    template = require('./app.html'),
    store = require('../store/index'),
    NavigationBar = require('../components/navigation-bar/NavigationBar'),
    BookPicker = require('../components/panels/book-picker/BookPicker'),
    ChapterPicker = require('../components/panels/chapter-picker/ChapterPicker'),
    ChapterPanel = require('../components/panels/chapter-panel/ChapterPanel'),
    TEXT_SCALE_MAP, router;

TEXT_SCALE_MAP = [
   'text-scale-one', 'text-scale-two', 'text-scale-three', 'text-scale-four', 'text-scale-five',
   'text-scale-six', 'text-scale-seven', 'text-scale-eight', 'text-scale-nine', 'text-scale-ten',
];

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
         textScale: TEXT_SCALE_MAP[1],
      };
   },

   created: function() {
      this.$store.dispatch('fetchLanguages')
         .then(function() {
            return this.$store.dispatch('fetchEdition', 'nwtsty');
         }.bind(this))
         .done();

      this.textScale = localStorage.getItem('text-scale') || this.textScale;
   },

   methods: {

      onNavItemClicked: function(action) {
         var currentScaleIndex;

         if (action === 'increaseTextSize' || action === 'decreaseTextSize') {
            currentScaleIndex = _.indexOf(TEXT_SCALE_MAP, this.textScale);
            currentScaleIndex += (action === 'increaseTextSize' ? 1 : -1);
            currentScaleIndex = Math.min(currentScaleIndex, TEXT_SCALE_MAP.length - 1);
            currentScaleIndex = Math.max(currentScaleIndex, 0);
            this.textScale = TEXT_SCALE_MAP[currentScaleIndex];
            localStorage.setItem('text-scale', TEXT_SCALE_MAP[currentScaleIndex]);
         }
      },

   },

});
