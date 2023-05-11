const express = require('express');
const path = require('path');
const indexRouter = require('./routes/index');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);

app.listen(3000, function () {
    console.log('App is listening on port 3000!');
});
