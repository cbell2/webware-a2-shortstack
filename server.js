var http = require('http'),
  fs = require('fs'),
  url = require('url'),
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
  switch (req.method) {
    case "GET":
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
      break;

      case "POST":
      console.log("POST request");
        break;

      else{
        get404(req, res);
        break;
      }
  }
})

server.listen(process.env.PORT || port);
console.log('listening on 8080')

function get404(req, res){
  //fill in
}
// subroutines
// NOTE: this is an ideal place to add your data functionality

function sendFile(res, filename, contentType) {
  contentType = contentType || 'text/html';

  fs.readFile(filename, function(error, content) {
    res.writeHead(200, {'Content-type': contentType})
    res.end(content, 'utf-8')
  })

}
