// import { position, offset } from 'caret-pos';

Texts = new Mongo.Collection("texts");
console.log("111234");
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


      // const input = document.querySelector('#text-editor');
      // // const pos = position(input); // { left: 15, top: 30, height: 20, pos: 15 }
      // const off = offset(input); // { left: 15, top: 30, height: 20 }
      // console.log(offset.left, offset.top, offset.height);

      updateText(document.getElementById("text-editor").innerHTML);
    }
  });

}
