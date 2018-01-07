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
      languages: undefined,
      edition: undefined,
      chapter: undefined,
   },

   getters: {

      editions: function(state) {
         var localeData = state.languages ? state.languages[state.locale] : undefined;

         return localeData ? localeData.editions : undefined;
      },

      book: function(state) {
         var bookNum;

         if (state.edition) {
            bookNum = _.findKey(state.edition.books, { urlSegment: state.route.params.book });

            if (bookNum) {
               return _.extend({ bookNum: bookNum }, state.edition.books[bookNum]);
            }
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

      fetchChapter: function(context, chapterNum) {
         var bookNum, startVs, endVs;

         if (context.state.edition && context.getters.book) {
            bookNum = context.getters.book.bookNum;
            startVs = geckoAPI.makeVerseIdentifer(bookNum, chapterNum, 0);
            endVs = geckoAPI.makeVerseIdentifer(bookNum, chapterNum, 999);

            return geckoAPI.fetchVerses(context.state.edition.contentAPI, startVs, endVs)
               .then(function(chapterData) {
                  context.commit('storeChapter', chapterData);
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

      storeChapter: function(state, payload) {
         state.chapter = payload;
      },

   },

});
