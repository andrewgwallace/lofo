# LOFO

LOFO is a web application built in React that allows users to post lost and found times without needing to sign up.

See the finished site here: **[LOFO](https://lofoapp.herokuapp.com/)**

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You should have Node, Express, and NPM installed on your local machine. Additionally, you should also create a local postgres database and name it`lofo`. 

### Installing

Within the project directory, run ```npm install```

Next, run the necessary migrations and seeds from within the api directory.

```
knex migrate:latest
knex seed:run
```
*(NOTE: if you do not have knex installed globally, you will need to append* `npm run`to the above commands.

### Locally, you may run the following command:

```npm run dev```

This will run both the client and server on different ports.

### Production Development
To test as a production build, you may run the following command:

```npm start```

This will build a new version of the client into a build/ folder. It will then run the server which will deliver the client. In this case, you will want to go to port 3004 by default.

## Built With
* [React](https://reactjs.org/) - Frontend Framework
* [Express](http://www.expressjs.com)
* [Knex](https://www.knexjs.com/) - Query building
* [Axios](https://github.com/axios/axios)
* jQuery
* Moment
* Popper.js
* Bootsrap
* body-parser
* [CORS](https://github.com/expressjs/cors) - Cross-origin resource sharing package

## Authors

* **Andrew Wallace** - [GitHub](https://github.com/andrewgwallace)