/*
	Example of a very simple MQTT consumer app.

	This app subscribes to events at a public MQTT broker and makes them 
	available by a REST API. For demonstration purposes, it continuously 
	publishes random values under the subscribed MQTT topic.

	(C) Fraunhofer AISEC, 2017
*/
var time = 0

// Start REST server
var express = require('express');
var app = express();



// Publish event
function publishEvent () { 
    var d = new Date();
    time = d.getTime();
    console.log('Veroeffentliche Zeit %f', String(time))
}

// Publish on intervall
setInterval(() => {
  publishEvent()
}, 1000)

// Start REST endpoint /timeMilliseconds
app.get('/timeMilliseconds', function (req, res) {
   res.end(String(time))
})

var server = app.listen(8080, function () {
  var host = server.address().address
  var port = server.address().port
  console.log("REST API listening at http://%s:%s", host, port)
})
