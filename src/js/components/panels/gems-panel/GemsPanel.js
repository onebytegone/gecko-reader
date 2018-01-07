'use strict';

var _ = require('underscore'),
    template = require('./gems-panel.html');

module.exports = {

   template: template,

   props: [ 'chapter' ],

   computed: {

      studyContent: function() {
         var items = [],
             titleStudyNote, verseZero;

         if (!this.chapter) {
            return [];
         }

         titleStudyNote = _.find(this.chapter.commentaries, function(commentary) {
            return !!commentary.label;
         });

         if (titleStudyNote) {
            verseZero = {
               standardCitation: titleStudyNote.label,
               studyNotes: titleStudyNote,
            };
         }

         items = _.chain([ verseZero ])
            .concat(_.map(this.chapter.verses, function(verse) {
               return {
                  studyNotes: _.find(this.chapter.commentaries, function(commentary) {
                     return commentary.source === verse.vsID;
                  }),
                  standardCitation: verse.standardCitation,
               };
            }.bind(this)))
            .filter(_.identity)
            .value();

         return items;
      },

   },

};
