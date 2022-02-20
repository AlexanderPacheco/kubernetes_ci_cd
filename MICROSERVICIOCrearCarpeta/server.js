const express = require('express');
const app = express();

const cors = require('cors')
const corsOptions = {
  origin: 'http://localhost:4200',
  optionsSuccessStatus: 200
}
app.use(cors(corsOptions))
 
let router = require('./app/routers/s3.router.js');
app.use('/', router);
 
// Create a Server
const server = app.listen(3200, function () {
 
  let host = server.address().address
  let port = server.address().port
 
  console.log("App listening at http://%s:%s", host, port);
})
