import { position, offset } from 'caret-pos';

Texts = new Mongo.Collection("texts");
function updateText(newText,newLeft,newTop,newHeight) {
  var theText = Texts.findOne({}, {sort: {createdAt: -1}});

  if (theText) {
    Texts.update(theText._id, {$set: {text: newText, left: newLeft, top:newTop, height: newHeight}});
  } else {
    theText = {};
    theText.text = newText;
    theText.left = 0;
    theText.top = 0;
    theText.height = 0;
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


      const input = document.querySelector('#text-editor');
      const pos = position(input); // { left: 15, top: 30, height: 20, pos: 15 }
      const cursorDiv = document.querySelector("#cursor");
      updateText(document.getElementById("text-editor").innerHTML,pos.left+7,pos.top+7,pos.height);
    }
  });

}
