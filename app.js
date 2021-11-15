var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path')
var mongojs = require('mongojs');
var db = mongojs('goldtracker', ['goals']);

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'client')))

app.get('/', function (req, res) {
    res.send('It works!');
});

app.get('/goals', function (req, res) {
    db.goals.find(function (err, docs) {
        if (err) {
            res.send(err);
        } else {
            console.log('Getting goals...');
            res.json(docs);
        }
    });
});

app.post('/goals', function (req, res) {
    db.goals.insert(req.body, function (err, docs) {
        if (err) {
            res.send(err);
        } else {
            console.log(req.body);
            console.log('Adding goals...');

            res.json(docs);
        }
    });
});

app.put('/goals/:id', function (req, res) {
    db.goals.findAndModify({
        query: { _id: mongojs.ObjectID(req.params.id) },
        update: {
            $set: {
                name: req.body.name,
                name: req.body.type,
                deadline: req.body.deadline,
            }
        },
        new: true,
    },

        function (err, doc) {
            if (err) {
                res.send(err);
            } else {               
                console.log('Updating goal...');
                res.json(doc);
            }
        });
});

app.delete('/goals/:id', function (req, res) {
    db.goals.remove({ _id: mongojs.ObjectID(req.params.id) }, function (err, docs) {
        if (err) {
            res.send(err);
        } else {
            console.log(req.body);
            console.log('Removing goals...');

            res.json(docs);
        }
    });
});

app.listen(3000);
console.log('Running on port 3000')





