### MERN Messenger

[Outline](#Outline) | [Installation Instructions](#Installation_Instructions) | [Tech stack](#Tech_stack) | [Example use](#Example_use) | [Future work](#Future_work)

## <a name="Outline">Outline</a>

Use the MERN stack to build a message board app. 

## <a name="Installation_Instructions">Installation Instructions</a>

### Prerequisite setup:
- Clone this repo to your local machine and cd into it.
- Download Node.js if you don't have it already - [instructions here](https://nodejs.org/en/).
- Run `cd backend && npm install` and `cd ../frontend && npm install` to get the project's dependencies.

### Database setup:

In order to persist messages across reloads, the app makes use of MongoDB. In order to use this in the dev environment, you must have it installed locally. Instructions on how to do this [here](https://zellwk.com/blog/install-mongodb/).

### Running the site

Development:
- Start the Mongo connection with `brew services run mongodb-community`.
- Run the frontend server in one terminal window, from the frontend directory, with the command `npm start`. Run the backend server in another terminal window, from the backend directory, with `npm start`.
- Visit `http://localhost:3000` to use the site.

Production:
- There isn't a production version at the moment. See future work section below. 

### Testing
- Tests can be run against both the frontend and the backend code. In either directory, run `npm test`.

## <a name="Tech_stack">Tech stack</a>

Front-end:
- HTML & CSS
- React

Back-end:
- Node.js
- Express
- MongoDB

Testing:
- Mocha, Chai for backend
- Jest, Enzyme for frontend
- Supertest for testing the API connections

## <a name="Example_use">Example use</a>

Some screenshots of the different functionality of the site:

## <a name="Future_work">Future work</a>

On a revisit of the project, I would like to add the following:
- CI & CD
- On the CD point, production deployment
- Styling
- Authentication