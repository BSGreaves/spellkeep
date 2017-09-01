SpellKeep
=========

A Dungeons and Dragons (5E D&D) spellbook and character manager

------
![Project Image](https://user-images.githubusercontent.com/25022285/29954156-61ec445a-8e9b-11e7-94ec-009e67e4b596.png)

Project Goals
-----
I've spent many nights with friends playing tabletop roleplaying games like D&D, rolling dice, calculating stats, and trying to remember whether the Fireball spell has a range of 100ft or 150ft. Next thing I know I'm digging through a 400-page reference book and comparing it to garbled notes from 3 months ago. There's got to be a better way, right?

I built SpellKeep to streamline the experience and keep all that complex information right at my fingertips. My **primary goal** was to learn AngularJS while building a functional app with an intuitive, seamless UI that didn't draw the user out of the social aspect of tabletop gaming, but drew them back in by speeding up the pace of play.

Technologies
------------
SpellKeep is built in [AngularJS](https://angularjs.org/) 1.6 , with a [Bootstrap 3](https://getbootstrap.com/docs/3.3/) layout and a [Firebase](https://firebase.google.com/) backend. It's deployed via [Heroku](https://dashboard.heroku.com/login) using a simple Node.js microservice. It calls the [D&D 5E API](http://www.dnd5eapi.co/) for JSON-formatted data and uses simple OOP to transform and render character and spell objects. I used [Grunt](https://gruntjs.com/) and [SASS](http://sass-lang.com/) for linting, task management, and CSS compiling. It makes extensive use of [UI-Bootstrap](https://angular-ui.github.io/bootstrap/), with a persistent sidebar to make navigation intuitive, and modals and accordions to make complex information available yet unobtrusive. Thanks to [Font-Awesome](http://fontawesome.io/) and [Game-Icons.Net](http://game-icons.net/) for providing the nav-bar icons.

Features
------------
**Note:  SpellKeep is optimized for desktops - not recommended for small screens!**

Working features

 - Create and level up characters (Wizards)
 - Track character statistics 
 - Expend spells slots and rest to restore them
 - Search and reference spell statistics

Features in Development

 - More characters (sorcerers and clerics)
 - Inventory manager
 - Reference material for monsters, items, etc.

Cloning and Contributing
---------------------------------

 1. You should have [NPM](https://www.npmjs.com/) installed
 2. Clone down this repo. `cd` into the directory and run `npm install`
 3. To run it locally, you will need access to the firebase database. Shoot me a message on [LinkedIn](https://www.linkedin.com/in/bsgreaves/) if you'd like to contribute!
