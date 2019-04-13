# paperwrite

Paperwrite is a Meteor app that brings distraction-free writing to the Kindle. 

This fork is based on [http://www.shubhro.com/2015/01/30/writing-amazon-kindle/](Shubhro Saha's "typewriter"). It adds a visible cursor, and removes the separate backup process in favour of a (rather hacky) continuous write into text files on the server.

- Set PAPERWRITE_SAVE_PATH to a folder where you want the text files to be saved
- Install [Node](http://nodejs.org/) and [Meteor](https://www.meteor.com/)
- `cd meteor-app && meteor`
- Open `localhost:3000/?editor` in your computer's web browser
- Open `[your computer's IP address]:3000` in your Kindle's browser

Click on the computer web app's top left corner to start typing. What you type there will now instantly appear on the Kindle. 
