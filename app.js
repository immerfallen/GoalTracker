var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path')
var mongojs = require('mongojs');
var db = mongojs('goldtracker', ['goals']);

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'client')))

app.get('/', function(req, res){
    res.send('It works!');
});

app.listen(3000);
console.log('Running on port 3000')





