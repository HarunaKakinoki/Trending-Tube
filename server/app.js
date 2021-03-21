const express = require('express');
const PORT_NUMBER = "5000";

const indexRouter = require('./routes/index');
const apiRouter = require('./routes/api');

const app = express();

//Serve files under the "build" folder.
app.use(express.static('build'));

app.listen(PORT_NUMBER, () => {
  console.log(`server is listening on port ${PORT_NUMBER}`);
});

//Routes.
app.use('/', indexRouter);
app.use('/api/videos', apiRouter);
