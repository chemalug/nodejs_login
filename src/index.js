/**
 * @author José Miranda
 * @email chemalug@gmail.com
 * @create date 2020-02-25 10:56:11
 * @modify date 2020-02-25 10:56:11
 * @desc [description]
 */

/**
 * * imports
 */
const express = require('express');
const hbs = require('express-handlebars');
const path = require('path')
const routes = require('./routes/login');
const morgan = require('morgan');
const passport = require('passport');
const session = require('express-session');
const flash = require('connect-flash');
/**
 * * Inicializaciones
 */
const app = express();
require('./db');
require('./passport/auth')
/**
 * * Configuraciones
 */
app.set('views', path.join(__dirname,'views/' ));
app.use(express.static('public'));
app.engine('hbs', hbs({
     layoutsDir: app.get('views/layouts/'),
     partialsDir: app.get('views/partials'),
     extname: 'hbs',
     defaultLayout: 'main'
}));
app.set('view engine', 'hbs');
app.set('PORT', process.env.port || 3000 );

/**
 * * Middlewares
 */
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(session({
     secret: 'mysecretsession',
     resave: false,
     saveUninitialized: false
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use((req, res, next) => {
     app.locals.local_message = req.flash('local_message');
     next();
});

/**
 * * Routes
 */

app.use('/', routes);


/**
 * * Iniciando Servidor
 */
app.listen(app.get('PORT'), () => {
     console.log('Servidor en puerto', app.get('PORT'));
});