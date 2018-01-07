'use strict';

var Q = require('q'),
    fetchJsonp = require('fetch-jsonp'),
    BASE_URL = 'https://www.jw.org/';

module.exports = {

   fetchLanguages: function() {
      var url = this._appendSegments(BASE_URL, 'en/publications/bible/json');

      return this._fetchJson(url)
         .then(function(json) {
            return json.langs;
         });
   },

   fetchEditionData: function(editionContentUrl) {
      var url = this._appendSegments(editionContentUrl, 'data');

      return this._fetchJson(url)
         .then(function(json) {
            return json.editionData;
         });
   },

   fetchVerses: function(editionContentUrl, startingVerseID, endingVerseID) {
      var range = startingVerseID + '-' + endingVerseID,
          url = this._appendSegments(editionContentUrl, 'data', range);

      return this._fetchJson(url)
         .then(function(json) {
            return json.ranges[range];
         });
   },

   makeVerseIdentifer: function(bookNumber, chapterNumber, verseNumber) {
      return bookNumber + ('00' + chapterNumber).slice(-3) + ('00' + verseNumber).slice(-3);
   },

   _appendSegments: function(url/* , segments... */) {
      return url + [].slice.call(arguments, 1).join('/');
   },

   _fetchJson: function(url) {
      return Q.when(fetchJsonp(url, { timeout: 10000 }))
         .then(function(response) {
            return response.json();
         });
   },

};
