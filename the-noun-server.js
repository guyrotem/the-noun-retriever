var sys = require('sys'),
http = require('http'),
noun_previews = require('./my-noun-previews.js');

http.createServer(function (request, response) {
    response.header('Access-Control-Allow-Origin', '*');
    if (request.method == 'POST') {
	    var body = '';
		request.on('data', function (data) {
	    	body += data;

	    // Too much POST data, kill the connection!
	    	if (body.length > 1e6) {
	        	request.connection.destroy();
	        }
	    });
	    request.on('end', function () {
	        console.log(body);
	        var query = JSON.parse(body).q;
	        noun_previews.getPreviews(query, function (err, results) {
		 		if (!err) {
		 			response.write(JSON.stringify({searchResults: results}));
		 		}
	     		response.end();
	     	});
	    });
	}
}).listen(8080);
console.log("Server Running on 8080"); 
