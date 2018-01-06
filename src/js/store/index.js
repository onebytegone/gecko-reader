'use strict';

var _ = require('underscore'),
    Q = require('q'),
    Vue = require('vue'),
    Vuex = require('vuex'),
    geckoAPI = require('../api/gecko');

Vue.use(Vuex);

module.exports = new Vuex.Store({

   state: {
      locale: 'en',
      languages: {},
      edition: {},
   },

   getters: {

      editions: function(state) {
         var localeData = state.languages[state.locale];

         return localeData ? localeData.editions : [];
      },

      book: function(state) {
         if (state.edition) {
            return _.findWhere(state.edition.books, { urlSegment: state.route.params.book });
         }

         return undefined;
      },

   },

   actions: {

      fetchLanguages: function(context) {
         return geckoAPI.fetchLanguages()
            .then(function(languageData) {
               context.commit('storeLanguages', languageData);
            });
      },

      fetchEdition: function(context, pubSymbol) {
         var editionInfo = _.findWhere(context.getters.editions, { symbol: pubSymbol });

         if (editionInfo && editionInfo.contentAPI) {
            return geckoAPI.fetchEditionData(editionInfo.contentAPI)
               .then(function(editionData) {
                  editionData.bookCount = parseInt(editionData.bookCount, 10);

                  _.each(editionData.books, function(book) {
                     book.chapterCount = parseInt(book.chapterCount, 10);
                  });

                  context.commit('storeEdition', _.extend({}, editionInfo, editionData));
               });
         }

         return Q.when();
      },

   },

   mutations: {

      storeLanguages: function(state, payload) {
         state.languages = payload;
      },

      storeEdition: function(state, payload) {
         state.edition = payload;
      },

   },

});
