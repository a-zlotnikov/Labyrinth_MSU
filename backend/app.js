const express = require('express');
const useMiddleware = require('./middleware');
const useErrorHandlers = require('./middleware/error-handlers');

const app = express();
useMiddleware(app);

const resultsRouter = require('./routes/results');
const usersRouter = require('./routes/users');
const indexRouter = require('./routes/index');

app.use('/results', resultsRouter);
app.use('/users', usersRouter);
app.use('/', indexRouter);

// Подключаем импортированные маршруты с определенным url префиксом.

useErrorHandlers(app);

module.exports = app;
