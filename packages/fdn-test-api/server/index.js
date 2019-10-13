const http = require('http');
const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');

const api = require('./api');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());

app.use('/api', api);

const server = http.Server(app);

server.listen(PORT, () => console.log(`Listening on port ${PORT}`));
