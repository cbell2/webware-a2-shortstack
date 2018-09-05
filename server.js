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
    }else if(req.method === 'POST'){
      console.log("POST request");
      var body = '';
        req.on('data', function (data) {
            body += data;
        });
        req.on('end', function () {
            console.log("Body: " + body);
            var formData = qs.parse(body);
            console.log(formData.brewer);
            doAPICall(req, res, formData)
        });
        res.writeHead(200, {'Content-Type': 'text/html'});
        //res.end('post received');

    }else{
        get404(req, res);
      }
  }
)

server.listen(process.env.PORT || port);
console.log('listening on 8080')

function doAPICall(res, req, data){
  //separate the data
  //get the data needed for api call
  var alcLow = data.Alcohol1;
  var alcHigh = data.Alcohol2;
  var style = data.style;
  var category = data.categories;
  var brewer = data.brewer;
  var country = data.country;
  //organize the data
  var apiUrl = 'http://data.opendatasoft.com/api/records/1.0/search/?dataset=open-beer-database%40public-us&sort=-abv&facet=style_name&facet=cat_name&facet=name_breweries&facet=country&refine.cat_name='+ category +'&refine.country=' + country +'&refine.name_breweries='+ brewer + '&refine.style_name='+ style;
  //do the api call
  var parsedData;
  var cont = 0;
  http.get(apiUrl, (resp) => {
    let data = '';
    resp.on('data', (chunk) => {
      data += chunk;
    });

    // The whole response has been received. Print out the result.
    resp.on('end', () => {
      console.log(data);
      parsedData = JSON.parse(data);
      console.log(parsedData.records[0].fields.descript);
      console.log(parsedData.records[1].fields.descript);
      //console.log(parsedData.records.length);
    });
    }).on("error", (err) => {
      console.log("Error: " + err.message);
    });


    setTimeout(function(){
      console.log(parsedData.records[1].fields.descript);
    }, 1000);

    //console.log(parsedData.records[1].fields.descript);

    //Have to add a callback to wait for function to finish

      /*
      var go = 1;
      var count;
      for (count = 0; go != 0; x++){
        if(parsedData.records[x].fields.descript != NULL){
          continue;
        }else{
          go = 0;
        }
      }
      console.log(count);

      */
      //var listSize = Object.keys(parsedData.records).length;

    /*

    //organize that data (find one between the alcohol value)
    var alcByVolumeList;
    for(var x = 0; x < parsedData.nhits; x++){
      if (parsedData.records[x].fields.abv > alcLow && parsedData.records[x].fields.abv < alcHigh){
        alcByVolumeList.push(beer);
      }
    }

    */

    /*
    parsedData.records.forEach(function(beer)){
      if (beer.fields.abv > alcLow && beer.fields.abv < alcHigh){
        alcByVolumeList.push(beer);
      }
    }
    */
    //listSize = alcByVolumeList.length;
    //console.log("There are " + listSize + " options.");
  //send the data back with index.html
}



function get404(req, res){
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
