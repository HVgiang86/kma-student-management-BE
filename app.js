var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var db = require('./configs/dbconnection');
const bodyParser = require('body-parser');

db.authenticate().then(() => {
    console.log('Connection has been established successfully.');
}).catch(err => {
    console.error(err);
})


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users/users');
var loginRouter = require('./routes/login/login');
var passwordRouter = require('./routes/users/password');
var roleRouter = require('./routes/users/roles');

var app = express();

var port = process.env.PORT || '3000';

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.set('port',port);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/login', loginRouter);
app.use('/change_password', passwordRouter);
app.use('/change_role', roleRouter);


const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Node Express API for KMA Student management web project',
            version: '1.0.0',
        },
        server: {
            api: 'http://localhost:3000'
        }
    },
    apis: ['./routes/users/users.js']
}

const swaggerDocs = swaggerJsDoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
  });
  
  // error handler
  app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // render the error page
    res.status(err.status || 500);
    res.render('error');
  });

module.exports = app;
