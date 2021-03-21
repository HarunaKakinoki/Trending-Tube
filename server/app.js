const express = require('express');
const PORT_NUMBER = "3000";

const indexRouter = require('./routes/index');
const allRouter = require('./routes/all');
const apiRouter = require('./routes/api');

const app = express();

//Serve files under the "build" folder.
app.use(express.static('build'));

//process.env.PORT is the setting for Heroku.
app.listen(process.env.PORT || PORT_NUMBER, () => {
  console.log(`server is listening on port ${PORT_NUMBER}`);
});

//Routes.
app.use('/', indexRouter);
app.use('/all', allRouter);
app.use('/api/videos', apiRouter);
