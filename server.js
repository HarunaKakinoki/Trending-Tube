const express = require('express');
const app = express();
const path = require('path');

app.use(express.static('build'));


app.listen(3000, () => console.log('server is listening on port 3000!'));

// create a GET route
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });