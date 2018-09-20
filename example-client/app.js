/*
	Example of a very simple consumer app.

	This app publishes events and makes them 
	available by a REST API. For demonstration purposes, it continuously 
	publishes the current global time in milliseconds.
	
	(C) Fraunhofer AISEC, 2017s
*/
var time = 0

// Start REST server
var express = require('express');
var app = express();


// Publish time event
function publishEvent () { 
    var d = new Date();
    time = d.getTime();
    console.log('Publish time %f', String(time))
}

// Publish on intervall
setInterval(() => {
  publishEvent()
}, 1000)

// Start REST endpoint /timeMilliseconds
app.get('/timeMilliseconds', function (req, res) {
   res.end(String(time))
//It is important to send the time value as a String.
})

var server = app.listen(8080, function () {
  var host = server.address().address
  var port = server.address().port
  console.log("REST API listening at http://%s:%s", host, port)
})
