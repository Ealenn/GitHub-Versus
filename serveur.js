'use strict';

// [START setup]
let express = require('express')
let app = express();
app.use('/assets', express.static('public'))

/* Router */
let expressControllers = require('express-controller');
let router = express.Router();
app.use(router);
expressControllers.setDirectory( __dirname + '/controllers').bind(router);

/* Index */
app.get('/', (req, res, next) => {
  res.sendFile(__dirname + '/public/index.html');
});

// [START listen]
const PORT = process.env.PORT || 3030;
app.listen(PORT, () => {
  console.log('App listening on port %s', PORT);
  console.log('Press Ctrl+C to quit.');
});
// [END listen]

module.exports = app;