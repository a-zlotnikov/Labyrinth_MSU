const express = require('express');
const useMiddleware = require('./middleware');
const useErrorHandlers = require('./middleware/error-handlers');

const app = express();
useMiddleware(app);

const resultsRouter = require('./routes/results');
const usersRouter = require('./routes/users');
const indexRouter = require('./routes/index');
const typesRouter = require('./routes/types');
const environmentRouter = require('./routes/environment');
const experimentRouter = require('./routes/experiment')

app.use('/experiment', experimentRouter);
app.use('/environment', environmentRouter);
app.use('/types', typesRouter);
app.use('/results', resultsRouter);
app.use('/users', usersRouter);
app.use('/', indexRouter);

// Подключаем импортированные маршруты с определенным url префиксом.

useErrorHandlers(app);

module.exports = app;
