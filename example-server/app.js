/*
  Example of a very simple REST consumer app.

  This app accepts values from POST requests to 
  http://<host>:8081/timeMilliseconds
  and displays them under
  http://<host>:8081/
  
  For demonstration purposes only.

  (C) Fraunhofer AISEC, 2017s
*/
var time = 0;

// Start REST server
//Express variable is used to represent that express is requiered.
var express = require('express');
//Initialize express using the brackets.
var app = express();


// just use raw body data
var bodyParser = require('body-parser')
var options = {
  inflate: true,
  limit: '10kb',
  type: 'text/xml'
};
app.use( bodyParser.raw(options) );

// Start REST endpoint /timeMilliseconds
app.post('/timeMilliseconds', function (req, res) {
  time = req.body
  console.log('received time in milliseconds ' + time)
  res.end('OK')
})

// Start web page /
//A GET request get's data
//'/' is the path, function is a middlewarefunction
//req is the requirement argument
//res is the resonse argument
//next is the callback argument
app.get('/', function (req, res, next) {
  try {
    var html = '<html><body><h1>Zeit in Millisekunden '+Number(time)+'</h1><script>function refresh () {window.location.reload(true);}; window.setTimeout(refresh, 1000);</script></body></html>'
    res.send(html)
  } catch (e) {
    next(e)
  }
})

var server = app.listen(8081, function () {
  var host = server.address().address
  var port = server.address().port
  console.log("REST API listening at http://%s:%s", host, port)
})
