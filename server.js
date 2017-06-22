require('babel-register');

const express = require('express');
const React = require('react');
const ReactDOMServer = require('react-dom/server');
const ReactRouter = require('react-router');
const ServerRouter = ReactRouter.ServerRouter;
const _ = require('lodash');
const fs = require('fs');
const axios = require('axios');
const PORT = 5050;
const baseTemplate = fs.readFileSync('./index.html');
const template = _.template(baseTemplate);
const App = require('./js/app').default;
const Key = {
  googleMapApi: process.env.googleMapApi || require('./secretKey').googleMapApi,
  darkskiApi: process.env.darkskiApi || require('./secretKey').darkskiApi
};

const server = express();

server.use('/public', express.static('./public'));

server.use('/getLocation/:address', (req, res, next) => {
  axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${req.params.address}&language=en&key=${Key.googleMapApi}`)
  .then((data) => {
    res.json(data.data);
  })
  .catch(next);
});

server.use('/getWeather/:lat/:lng', (req, res, next) => {
  axios.get(`https://api.darksky.net/forecast/${Key.darkskiApi}/${req.params.lat},${req.params.lng}`)
  .then((data) => {
    res.json(data.data);
  })
  .catch(next);
});

server.use('/*', (req, res) => {
  const context = ReactRouter.createServerRenderContext();
  const body = ReactDOMServer.renderToString(
    React.createElement(ServerRouter, {location: req.originalUrl, context: context},
      React.createElement(App)
    )
  );

  res.write(template({body: body}));
  res.end();
});

console.log('listening on port', PORT);
server.listen(process.env.PORT || PORT);
