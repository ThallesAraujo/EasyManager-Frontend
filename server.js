const express = require('express');
const app = express();

app.use(express.static(__dirname + '/dist/easymanager-frontend'));

app.get('/*', function(req, res){
  res.header("Access-Control-Allow-Origin", req.url);
  res.header('Access-Control-Allow-Methods', 'PUT, PATCH, GET, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.sendFile(__dirname +'/dist/easymanager-frontend/index.html');
});

app.listen(process.env.PORT||4200);
