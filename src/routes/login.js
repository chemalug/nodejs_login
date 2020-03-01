/**
 * @author José Miranda
 * @email chemalug@gmail.com
 * @create date 2020-02-27 15:43:00
 * @modify date 2020-02-27 15:43:00
 * @desc [description]
 */
const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/', (req, res, next) => {
     //res.render('layouts/main', { layout: 'main'});
     res.render('index', { layout: false });
});
router.get('/register', (req, res, next) => {
     res.render('register',{ layout: false });
});
router.post('/register', passport.authenticate('local-signup', {
     successRedirect: '/home',
     failureRedirect: '/register',
     passReqToCallback: true
}));
router.get('/login', (req, res, next) => {
     res.render('login', { layout: false });
});
router.post('/login', passport.authenticate('local-signin', {
     successRedirect: '/home',
     failureRedirect: '/login',
     passReqToCallback: true
}));
router.get('/logout', (req, res, next) => {
     req.logout();
     res.redirect('/login');
});
router.get('/home', isAuthenticated , (req, res, next) => {
     res.render('home');
});
function isAuthenticated(req, res, next) {
     if (req.isAuthenticated()) {
          return next();
     } 
     res.redirect('/login');
};

module.exports = router;