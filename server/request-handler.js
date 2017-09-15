/*************************************************************

You should implement your request handler function in this file.

requestHandler is already getting passed to http.createServer()
in basic-server.js, but it won't work as is.

You'll have to figure out a way to export this function from
this file and include it in basic-server.js so that it actually works.

*Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.

**************************************************************/
var defaultCorsHeaders = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10, // Seconds.
  'Content-Type': 'application/json'
};
var url = require('url');
var path = require('path');
var count = 2;
var messages = {results: [{username: 'umi', message: 'hi', roomname: 'lobby', objectId: '0'}, {username: 'Jay', message: 'hi', roomname: 'new', objectId: '1'}]};
//var messages = {results:[]};
var requestHandler = function(request, response) {


  var statusCode = 200;
  var headers = defaultCorsHeaders;
  headers['Content-Type'] = 'application/json';
  console.log('request', request.method);

  if (request.method === 'OPTIONS') {
    statusCode = 200;
    response.writeHead(statusCode, headers);
    response.end('');
  }

  if (request.method === 'GET') {
    if (request.url === '/classes/messages') {
      statusCode = 200;

      response.writeHead(statusCode, headers);
      response.end(JSON.stringify(messages));
    } else {
      response.writeHead(404, headers);
      response.end('');
    }
  }

  if (request.method === 'POST') {
    if (request.url === '/classes/messages') {
      console.log('server post');
      statusCode = 201;
      request.setEncoding('utf8');
      var body = '';
      request.on('data', function(data) {
        console.log(messages);
        var obj = JSON.parse(data);
        // var chunks = data.split('&');
        // var obj = {}
        // chunks.forEach(function(el) {
        //   var arr = el.split('=');
        //   obj[arr[0]] = arr[1];
        // });
        obj.objectId = JSON.stringify(count);
        count++;
        messages.results.push(obj);

      });
      //console.log(body);
      response.writeHead(201, headers);
      // response.end(JSON.stringify(messages));
      response.end(JSON.stringify(messages));
    } else {
      response.writeHead(404, headers);
      response.end('');
    }
  }
  // else {
  //   response.writeHead(404, headers);
  //   // response.end(JSON.stringify(messages));
  //   response.end('');
  // }

};

// These headers will allow Cross-Origin Resource Sharing (CORS).
// This code allows this server to talk to websites that
// are on different domains, for instance, your chat client.
//
// Your chat client is running from a url like file://your/chat/client/index.html,
// which is considered a different domain.
//
// Another way to get around this restriction is to serve you chat
// client from this domain by setting up static file serving.


exports.requestHandler = requestHandler;
exports.defaultCorsHeaders = defaultCorsHeaders;
