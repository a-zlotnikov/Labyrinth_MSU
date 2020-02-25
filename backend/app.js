const express = require('express');
const useMiddleware = require('./middleware');
const useErrorHandlers = require('./middleware/error-handlers');
const dotenv = require('dotenv').config();
const path = require('path');
const publicPath = path.join(__dirname, 'build');


const app = express();
useMiddleware(app);

const usersRouter = require('./routes/users');
const indexRouter = require('./routes/index');
const typesRouter = require('./routes/types');
const environmentRouter = require('./routes/environment');
const experimentRouter = require('./routes/experiment');

app.use('/experiment', experimentRouter);
app.use('/environment', environmentRouter);
app.use('/types', typesRouter);
app.use('/users', usersRouter);
app.use('/index', indexRouter);

// Подключаем импортированные маршруты с определенным url префиксом.
app.use(express.static(publicPath));
app.get('*', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

useErrorHandlers(app);

module.exports = app;
