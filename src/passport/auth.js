/**
 * @author José Miranda
 * @email chemalug@gmail.com
 * @create date 2020-02-27 15:43:31
 * @modify date 2020-02-27 15:43:31
 * @desc [description]
 */
const passport = require('passport')
const localStrategy = require('passport-local').Strategy;
const User = require('./../models/user');

passport.serializeUser((user, done) => {
     done(null, user.id);
});

passport.deserializeUser( async (id, done) => {
     await User.findById(id);
     done(null, User);
});

passport.use('local-signup', new localStrategy({
     usernameField: 'email',
     passwordField: 'password',
     passReqToCallback: true
}, async (req, email, password, done) => {
     
     var data = req.body;
     console.log(data);
     if (password.length < 8 ) {
          return done(null, false, req.flash('local_message','El password es demasiado corto, el mínimo es 8 caractéres'));
     }
     if (password != data.password_rep){
          return done(null, false, req.flash('local_message','Los passwords ingresados no coinciden'));
     }
     const existUser = await User.findOne({ email: email});
     if (existUser) {
          return done(null, false, req.flash('local_message', 'El email ya existe'));
     } else {
          const newUser = new User();
          newUser.email = email;
          newUser.password = newUser.encryptPassword(password);
          await newUser.save();
          done(null,newUser);
     }
}));

passport.use('local-signin', new localStrategy({
     usernameField: 'email',
     passwordField: 'password',
     passReqToCallback: true
}, async(req, email, password, done) => {
     const existUser = await User.findOne({ email: email });
     if (!existUser) {
          return done(null, false, req.flash('local_message','El email no se encuentra registrado'));
     }
     if (!existUser.comparePassword(password)) {
          return done(null, false, req.flash('local_message', 'Password incorrecto'));
     }
     done(null, existUser);
}));