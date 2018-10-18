const express = require('express');
const app = express();

app.use(express.static('/dist'));

app.get('/*', function(req, res){
  res.sendFile('/dist/index.html');
});

app.listen(process.env.PORT ||4200);
