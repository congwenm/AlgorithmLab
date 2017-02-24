var express = require('express')
var path    = require("path")
var TTT     = require('./ttt_compiled.js')

var app = express()
var game = new TTT()
game.playerMove([1,1])

app.set('view engine', 'pug');
app.set('views', __dirname);

app.use(express.static(__dirname));

app.get('/', (req, res) => {
  res.render('index.pug', { game: game })
})

app.listen(3000, () => {
  console.log('Example app listening on port 3000!')
})
