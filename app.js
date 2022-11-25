import createError from 'http-errors';
import express from 'express';
import path from 'path';
import logger from 'morgan'
import {subscribeEnpoints,configRequestTypes} from './routes/endpoint.conf.js'
import { fileURLToPath } from 'url';
import dotenv from 'dotenv'
import i18n from 'i18n'
var app = express();


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));

configRequestTypes(app)

app.use(express.static(path.join(__dirname, 'public')));


i18n.configure({
  locales: ['en', 'tr'],
  directory: path.join(__dirname, '/public/locales'),
  defaultLocale: 'en',
})
//default locale bozuk
app.use(i18n.init)

subscribeEnpoints(app)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {

  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500).json({message:err.message});
});

export default app;
