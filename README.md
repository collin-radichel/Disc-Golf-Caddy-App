
# Disc Golf Caddy App

_Duration: 2-week solo project sprint_

## Description

Imagine you’re on the tee-pad of a 500ft par 4 at your favorite disc golf course.  You haven’t played disc golf since last Fall.  You look in your bag, and see the plastic circles staring back at you.  Which one do you normally choose on long drives like this?  It’s hard to remember because it’s been months since you’ve played.  You pull out your phone to use the Disc Golf Caddy App.

This app allows you to prompt a suggestion of which disc in your bag you should throw on this particular hole.  No longer will you embarrass yourself in front of your friends because you will have the Disc Golf Caddy App working for you.

This app serves as a database to keep track of all of your discs.  When you leave for a round, you can update your inventory with a switch to indicate which discs are in your bag currently.  As discs change overtime due to wear & tear, you can update their characteristics in the app.  When you are looking for a suggestion, you will enter the type of disc you are looking for as well as desired distance and flight pattern.  The app will then suggest discs that meet those criteria with 'exact match', or 'similar distance'.

## Screenshots

### Inventory
![inventory-discs](https://user-images.githubusercontent.com/73554031/112509608-a20aef80-8d5e-11eb-9143-560631270013.png)
### Disc Details
![disc-details](https://user-images.githubusercontent.com/73554031/112510035-0b8afe00-8d5f-11eb-9df7-436514617323.png)
### Suggest Disc
![suggestion-disc](https://user-images.githubusercontent.com/73554031/112509627-a46d4980-8d5e-11eb-8d78-d491ed756953.png)
### Suggest Disc Results
![suggestion-results](https://user-images.githubusercontent.com/73554031/112509635-a6370d00-8d5e-11eb-8919-96e7a11882a1.png)

## Prerequisites

Before you get started, make sure you have the following software installed on your computer:

- [Node.js](https://nodejs.org/en/)
- [PostrgeSQL](https://www.postgresql.org/)
- [Nodemon](https://nodemon.io/)

## Create database and table

Create a new database called `disc_golf_caddy` and create a `user` table:

```SQL
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);
```

If you would like to name your database something else, you will need to change `disc_golf_caddy` to the name of your new database name in `server/modules/pool.js`

## Development Setup Instructions

- Run `npm install`
- Create a `.env` file at the root of the project and paste this line into the file:
  ```
  SERVER_SESSION_SECRET=superDuperSecret
  ```
  While you're in your new `.env` file, take the time to replace `superDuperSecret` with some long random string like `25POUbVtx6RKVNWszd9ERB9Bb6` to keep your application secure. Here's a site that can help you: [https://passwordsgenerator.net/](https://passwordsgenerator.net/). If you don't do this step, create a secret with less than eight characters, or leave it as `superDuperSecret`, you will get a warning.
- Start postgres if not running already by using `brew services start postgresql`
- Run `npm run server`
- Run `npm run client`
- Navigate to `localhost:3000`

Directory Structure:

- `src/` contains the React application
- `public/` contains static assets for the client-side
- `build/` after you build the project, contains the transpiled code from `src/` and `public/` that will be viewed on the production site
- `server/` contains the Express App

## Acknowledgement
Thanks to [Prime Digital Academy](www.primeacademy.io) who equipped me with the skills to make this application.

Special thanks to my instructor: Dane Smith

## Questions? I would love to connect!
Email me at - [radichel.collin@gmail.com](mailto:radichel.collin@gmail.com)
OR
Send me a message on [LinkedIn](https://www.linkedin.com/in/collin-radichel/)

