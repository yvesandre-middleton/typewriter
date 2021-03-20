# paperwrite

I was debating building something like this in Flask with sockets but stumbled on this lovely project where someone else had the same idea. I'm just forking it as I prefer the saving method from the original but the cursor and formatting from gwynm's fork. I'll also make some tweaks of my own and maybe add a feature to save a specific file by a name at some point. I spent many hours debating which route to take to be able to write on a kindle and this eneded being the easiest and cheapest option. I will be using a raspberry pi, battery pack, travel router, and bluetooth keyboard to make this setup usable anywhere.

-- Below is gwynm and shubro's read me

Paperwrite is a Meteor app that brings distraction-free writing to the Kindle. 

This fork is based on [Shubhro Saha's "typewriter"](http://www.shubhro.com/2015/01/30/writing-amazon-kindle/). It adds a visible cursor, and removes the separate backup process in favour of a (rather hacky) continuous write into text files on the server.

- Set PAPERWRITE_SAVE_PATH to a folder where you want the text files to be saved
- Install [Node](http://nodejs.org/) and [Meteor](https://www.meteor.com/)
- `cd meteor-app && meteor`
- Open `localhost:3000/?editor` in your computer's web browser
- Open `[your computer's IP address]:3000` in your Kindle's browser

Click on the computer web app's top left corner to start typing. What you type there will now instantly appear on the Kindle. 
