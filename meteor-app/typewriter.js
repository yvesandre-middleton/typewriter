// const fs = require('fs');

Texts = new Mongo.Collection("texts");

// Meteor.methods({
//   'save'({text}) {
//     console.log("SAVING " + text);
//     fs.writefile("test.txt",text);
//   }
// });

function updateText(newText) {
  var theText = Texts.findOne({}, {sort: {createdAt: -1}});

  if (theText) {
    Texts.update(theText._id, {$set: {text: newText}});
  } else {
    theText = {};
    theText.text = newText;
    Texts.insert(theText);
  }

  // Meteor.call('save',{text: newText});
  
}

if (Meteor.isClient) {
  Template.body.helpers({
    text: function () {
      var txt = Texts.findOne({}, {sort: {createdAt: -1}});
      if (txt) {
        return txt.text
          .replace(/&/g, "&amp;") //escape html...
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;")
          .replace(/"/g, "&quot;")
          .replace(/'/g, "&#039;")
          .replace(/\n/g,'<br/>'); //except for the bit we need
      } else {
        return "";
      }
    },
    rawtext: function () {
      var txt = Texts.findOne({}, {sort: {createdAt: -1}});
      return (txt ? txt.text : "");
    },
  });

  Template.body.events({
    "click #sync-button": function (event) {


      var txt = document.getElementById("text-editor").value.replace("¦","");
      var selStart = document.getElementById("text-editor").selectionStart;
      var selEnd = document.getElementById("text-editor").selectionEnd;

      txt = addCursor(txt,selStart);
      if (selEnd != selStart) {
        txt = addCursor(txt,selEnd+1);
      }

      updateText(txt);
    }
  });

}


function addCursor(txt,pos) {
  // const cursor = '\u030C\u032D';
  const cursor = '¦';
  var cursedChar = txt.substring(pos-1,pos); //this is the character immediately behind the insert point
  return txt.substring(0,pos) + cursor + txt.substring(pos);
}
