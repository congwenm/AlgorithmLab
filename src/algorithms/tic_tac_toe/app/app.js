var express = require('express')
var path    = require("path")
var TTT     = require('./ttt_compiled.js')
var bodyParser = require('body-parser');

var app = express()
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.set('view engine', 'pug');
app.set('views', __dirname);
app.use(express.static(__dirname));


var game = new TTT()

app.get('/', (req, res) => {
  res.render('index.pug', { game: game })
})

app.post('/move', (req, res) => {
  // console.log('asked to move', req.body)
  // console.log('asked to move', req.params)
  // console.log('asked to move', req.query)
  const {x, y} = req.body
  game.playerMove([x, y])
  // game.computerRespond()
  res.render('index.pug', { game: game })
})

app.listen(3000, () => {
  console.log('Example app listening on port 3000!')
})
