var http = require('http'),
  fs = require('fs'),
  url = require('url'),
  path = require('path'),
  qs = require('querystring'),
  XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest,
  port = 8000;

// NOTE: your dataset can be as simple as the following, you need only implement functions for addition, deletion, and modification that are triggered by outside (i.e. client) actions, and made available to the front-end
var data = [
  {
    'model': 'toyota',
    'year': 1999,
    'mpg': 23
  }, {
    'model': 'honda',
    'year': 2004,
    'mpg': 30
  }, {
    'model': 'ford',
    'year': 1987,
    'mpg': 14
  }
]

var server = http.createServer(function(req, res) {
  var uri = url.parse(req.url)
  if (req.method === 'GET') {
    switch (uri.pathname) {
      case '/':
        sendFile(res, 'public/index.html')
        break;
      case '/index.html':
        sendFile(res, 'public/index.html')
        console.log('ldwadawdawd0')
        break;
      case '/css/style.css':
        sendFile(res, 'public/css/style.css', 'text/css')
        break;
      case '/js/scripts.js':
        sendFile(res, 'public/js/scripts.js', 'text/javascript')
        break;
      case '/yes':
        console.log('yeeet')
        break;
      case '/barImage.jpg':
        sendFile(res, 'barImage.jpg')
        break;
      case '/beerTapTrans.png':
        sendFile(res, 'beerTapTrans.png')
        break;
      default:
        res.end('404 not found')
    }
  } else if (req.method === 'POST') {
    console.log("POST request");
    var body = '';
    req.on('data', function(data) {
      body += data;
    });
    req.on('end', function() {
      console.log("Body: " + body);
      var formData = JSON.parse(body);
      console.log(formData.brewer);
      console.log(formData.categories);
      console.log(formData.style);
      console.log(formData.country);

      doAPICall(res, formData)
    });

  } else {
    get404(req, res);
  }
})

server.listen(process.env.PORT || port);
console.log('listening on 8080')

function doAPICall(res, data) {
  //separate the data
  //get the data needed for api call
  var alcLow = data.Alcohol1;
  var alcHigh = data.Alcohol2;
  var style ='';
  var styleTrue = '';
  var category='';
  var categoryTrue = '';
  var brewer='';
  var brewerTrue = '';
  var country='';
  var countryTrue = '';

  if(data.style !== 'Any'){
    style = data.style;
    styleTrue = '&refine.style_name=';
  }

  if(data.categories !== 'Any'){
    category = data.category;
    categoryTrue = '&refine.cat_name';
  }

  if(data.brewer !== 'Any'){
    brewer = data.brewer;
    brewerTrue = '&refine.name_breweries=';
  }

  if(data.country !== 'Any'){
    style = data.country;
    countryTrue = '&refine.country=';
  }
  //organize the data
  var apiUrl = 'http://data.opendatasoft.com/api/records/1.0/search/?dataset=open-beer-database%40public-us&rows=6000&facet=style_name&facet=cat_name&facet=name_breweries&facet=country' + categoryTrue + category + countryTrue + country + brewerTrue + brewer + styleTrue + style;
  console.log(apiUrl);
  //do the api call
  parsedData = makeCall(apiUrl, res, alcLow, alcHigh, processResponse);
}

function makeCall(apiUrl, res, alcLow, alcHigh, callback) {
  var parsedData;
  http.get(apiUrl, (resp) => {
    let data = '';
    resp.on('data', (chunk) => {
      data += chunk;
    });

    // The whole response has been received. Print out the result.
    resp.on('end', () => {
      //console.log(data);
      parsedData = JSON.parse(data);
      callback(res, alcLow, alcHigh, parsedData);
    });
  }).on("error", (err) => {
    console.log("Error: " + err.message);
  });
}

function processResponse(res, alcLow, alcHigh, parsedData) {
  //console.log(parsedData.records[1].fields.descript);
  console.log(parsedData.nhits);
  var alcByVolumeList = [];
  for (var x = 0; x < parsedData.nhits; x++) {
    console.log(x);
    if (parsedData.records[x].fields.abv >= alcLow && parsedData.records[x].fields.abv <= alcHigh) {
      alcByVolumeList.push(parsedData.records[x]);
    }
  }

  console.log(alcByVolumeList.length);

  //THIS DOES NOT WORK YET!!!
  res.writeHead(200, {'Content-Type': 'application/x-www-form-urlencoded'});
  res.end(JSON.stringify(alcByVolumeList));

  //res.end('post received');


}

function get404(req, res) {
  //fill in
}
// subroutines
// NOTE: this is an ideal place to add your data functionality

/*
function submitbyid(){
  var brewer = document.getElementById("brewer").value;
  console.log(brewer);
}
*/

function sendFile(res, filename, contentType) {
  contentType = contentType || 'text/html';

  fs.readFile(filename, function(error, content) {
    res.writeHead(200, {'Content-type': contentType})
    res.end(content, 'utf-8')
  })

}
