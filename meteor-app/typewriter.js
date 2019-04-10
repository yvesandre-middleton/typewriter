import { position, offset } from 'caret-pos';

Texts = new Mongo.Collection("texts");
function updateText(newText) {
  var theText = Texts.findOne({}, {sort: {createdAt: -1}});

  if (theText) {
    Texts.update(theText._id, {$set: {text: newText}});
  } else {
    theText = {};
    theText.text = newText;
    Texts.insert(theText);
  }

}

if (Meteor.isClient) {
  Template.body.helpers({
    text: function () {
      return Texts.findOne({}, {sort: {createdAt: -1}});
    },
  });

  Template.body.events({
    "click #sync-button": function (event) {

      const cursor = '\u0338';

      var txt = document.getElementById("text-editor").value.replace("¦","");
      var selStart = document.getElementById("text-editor").selectionStart;
      var selEnd = document.getElementById("text-editor").selectionEnd;
      txt = txt.substring(0,selStart) + cursor + txt.substring(selStart);
      if (selEnd != selStart) {
        txt = txt.substring(0,selEnd+1) + cursor + txt.substring(selEnd+1);
      }
      updateText(txt);
    }
  });

}
