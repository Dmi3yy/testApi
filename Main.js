var Observable = require('FuseJS/Observable');

// Test-Observable which should store the fetched data
var response = Observable();

// fetch data on button-click and log data to console
var button = function(){
  testApi();
  console.log(JSON.stringify(response));
}

// Function which should update the Observable
function testApi(){
  apiFetch("api").then(function(newResponse){
    response.replaceAll(newResponse);
  });
}

// API
var ROOT_URL = "https://www.rwtravelbuddy.de/";
  function apiFetch(path, options) {
  	var url = encodeURI(ROOT_URL + path);

  	if(options === undefined) {
  		options = {};
  	}

  	// If a body is provided, serialize it as JSON and set the Content-Type header
  	if(options.body !== undefined) {
  		options = Object.assign({}, options, {
  			body: JSON.stringify(options.body),
  			headers: Object.assign({}, options.headers, {
  				"Content-Type": "application/json"
  			})
  		});
  	}

  	// Fetch the resource and parse the response as JSON
  	return fetch(url, options)
  		.then(function(response) {
        // This returns a promise
        return response.json();
      })
      .then(function(responseObject) {
        // Do something with the responseObject
        console.log("Log from the apiFetch-Function:" + JSON.stringify(responseObject));
        return responseObject;
      }).catch(function(err) {
        // An error occurred somewhere in the Promise chain
        console.log("Error");
      });
  }

module.exports = {
  button: button
}
