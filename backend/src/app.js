const express = require('express');
const main_router = require('./routes/router');

const app = express();

// add middlewares
app.use(main_router);
app.use((_, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
})

// serve application
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Listening on port ${port}.`);
});