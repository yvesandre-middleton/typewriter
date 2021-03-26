const fs = require('fs');
Texts = new Mongo.Collection("texts");

var lockWriting = false;

if (Meteor.isServer) {
  // var savePath = process.env.PAPERWRITE_SAVE_PATH;
  var savePath = undefined;
  console.log(savePath)
  if (savePath === undefined) {
    // console.log("Please set PAPERWRITE_SAVE_PATH to somewhere to save the output. Using /tmp until you do.");
    savePath = "/tmp/";
  }

  loadTextFromFilesystem(); 
}

/* On startup, sync from filesystem, in case something else has changed it. Note that we never check this again,
so if you keep the server running past midnight... */
function loadTextFromFilesystem() {
  fs.readFile(savePath + notesFileName(), 'utf8', Meteor.bindEnvironment((err,data) => {
    if (err) {
      console.log("Failed to load existing data ",err);
      updateText("");
    } else {
      console.log("Loaded ",data);
      updateText(data);
    }
  }));
}


Meteor.methods({
  'save'({text}) {
    if (!lockWriting) {
      lockWriting = true;
      fs.writeFile(savePath + notesFileName(),text, (e) => {lockWriting = false;});
    } else {
      console.log("WRITE SKIPPED due to lockWriting"); //TODO: Client should really debounce Save calls
    }
  }
});

/* Return eg 2019-04-10.txt, based on today's date */
function notesFileName() {
  var d = new Date();
  return d.getFullYear().toString() + "-" + d.getMonth().toString().padStart(2,"0") + "-" + d.getDay().toString().padStart(2,"0") + ".txt";
}

function updateText(newText) {
  var theText = Texts.findOne({}, {sort: {createdAt: -1}});

  if (theText) {
    Texts.update(theText._id, {$set: {text: newText}});
  } else {
    theText = {};
    theText.text = newText;
    Texts.insert(theText);
  }

  Meteor.call('save',{text: newText});
  
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
  // const cursor = '\u030C\u032D'; // neat idea, but doesn't work well on kindle
  const cursor = '¦'; //causes the text to move, but not too much - it's ok
  return txt.substring(0,pos) + cursor + txt.substring(pos);
}
