var express = require('express');
var app = express();

app.route('/')
  .get(function (req, res) {
    res.send('Get a random book');
  })
  .post(function (req, res) {
    console.log(req.query.start)
    console.log(req.query.end)
    res.send('Add a book');
  })
  .put(function (req, res) {
    res.send('Update the book');
  });

module.exports = {
  path: '/route',
  handler: app
}