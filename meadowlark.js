const express = require('express');

const app = express();

app.set('port', process.env.PORT || 3000);

app.use((req, res) => {
  res.type('text/plain');
  res.status(404);
  res.send('404 - Not found');
});
