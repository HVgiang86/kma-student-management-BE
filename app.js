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
db.sync().then(() => {
    console.log('Database sync has completed successfully');
}).catch(err => {
    console.error(err);
});

const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API for KMA Student management web project',
            version: '1.0.0',
            description: 'This is a REST API application made with Express. It retrieves data from MySQL database and returns it in JSON format.',
            contact: {
                email: 'hvgiang86@gmail.com'
            }
        },
        server: {
            url: 'http://localhost:3000'
        },
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                }
            }
        },
        security: [{
            bearerAuth: []
        }],
    },
    apis: ['./routes/users/users.js',
        './routes/users/roles.js',
        './routes/users/password.js',
        './routes/login/login.js',
        './routes/faculty/faculty.js',
        './routes/schedule/schedule.js',
        './routes/subject/subject.js',
        './routes/major/major.js']
}
const specs = swaggerJsDoc(options);

/**
 * @swagger   
 * components:
 *  securitySchemes:
 *    bearerAuth:
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT  
 * security:
 *  - bearerAuth: []                                                                                                                                                                                                                                                                                                                                                                                                                                        
 */


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users/users');
var loginRouter = require('./routes/login/login');
var passwordRouter = require('./routes/users/password');
var roleRouter = require('./routes/users/roles');
var facultyRouter = require('./routes/faculty/faculty');
var scheduleRouter = require('./routes/schedule/schedule');
var subjectRouter = require('./routes/subject/subject');
var majorRouter = require('./routes/major/major');

var app = express();

var port = process.env.PORT || '3000';

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.set('port', port);

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
app.use('/faculty', facultyRouter);
app.use('/schedule', scheduleRouter);
app.use('/subject', subjectRouter);
app.use('/major', majorRouter);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`)
});

module.exports = app;