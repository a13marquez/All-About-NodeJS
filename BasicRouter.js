'use strict':
const http = require('http');
const url = require('url');

let routes = {
  'GET':{
    '/': (req, res) => {
      res.writeHead(200, {'Content-type': 'text/html'});
      res.end('<h1>Hello Router</h1>');
    }
    '/about':(req, res) => {
      res.writeHead(200, {'Content-type': 'text/html'});
      res.end('<h1>This is the about page</h1>');
    }
    '/api/getinfo': (req, res) => {
      // fetch data from db and respond as JSON
      res.writeHead(200, {'Content-type': 'text/html'});
      res.end(JSON:stringify(req.queryParams));
    }
  },
  'POST':{
    'api/login': (req, res)=>{
      let body = '';
      req.on('data', data=>{
        body +=data;
        if(body.length > 2097152){
          res.writeHead(413, {'Content-type': 'text/html'});
          res.end('<h3> Error: the file being uploaded exceeds the 2MB limit</h3>');
          req.connection.destroy();
        }
      });

      res.on('end' ()=>{
        let params = qs.parse(body);
        console.log('Username: ' params['username']);
        console.log('Password: ', params['password']);
        //Query a db to see if the users exists
        //If son send a JSON response SPA
        res.end();
      })
    }
  },
  'NA':(req, res)=>{
    res.writeHead(404);
    res.end('Content not found!');
  }
}

function router(req, res){
  let baseURI = url.parse(req.url, true);
  /*console.log('Requested route: ', req.url);
  console.log('Requested route parsed: ', beseUri);
  console.log('Requested method: ', req.method);*/
  let resolveRoute = routes[req.method][baseUri.pathname];
  if(resolveRoute != undefined){
    req.queryParams = baseURI.query;
    resolveRoute(req,route);
  }else{
    routes['NA'](req,res);
  }
}

http.createServer(router).listen(3000, ()=>{
  console.log('Server running on port 3000');
});
