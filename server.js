// for express
var express = require('express');
var app = express();

app.set('port', 8080)

app.use('/', express.static(__dirname));

app.listen(app.get('port'), function() {
  console.log('running on http://localhost:8080');
})
