# A Weather Forecast App

Website URL: https://paulforecast.herokuapp.com/

A generic RESTful single page application. It leverages weather API and geolocation API to allow users to know the daily or weekly weather at thier current location quickly and their past search history. The user profile and each individual search history is persisted in a cloud database.

## Technology

-[ReactJS](https://facebook.github.io/react/)
  * For the view component of the app.

-[JSX](https://facebook.github.io/react/docs/jsx-in-depth.html)
  * For writing readable React codes.

-[React Router](https://github.com/rackt/react-router)
  * For creating collection of navigational components.

-[Redux.js](http://redux.js.org/)
  * For user to save their searchterm persistenly.

-[Express.js](http://expressjs.com/)
  * For building a MVC architecture on the server side.

-[Babel](https://babeljs.io/)
  * For transfering es6 code to browser readable.

-[Webpack](https://webpack.github.io/)
  * For bundling frontend JS codes including the following loader:
    * Json loader
    * Babel loader
    * CSS loader
    * ESLint loader

-[Firebase](https://firebase.google.com/)
  * For user to store there search history.
  * Implementing OAuth login with Google, Facebook, Twitter and Github.

-[Eslint](http://eslint.org/)
  * Using [semistandard](https://github.com/Flet/semistandard), a wrapper around a pre-configured eslint, to keep code cleaned and styled.

-[Server Side Rendering]
  * A faster way to rendering your pages without downloading JS in brouswer.

