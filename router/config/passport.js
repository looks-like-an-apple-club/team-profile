/**
 * Created by Choichanghyun on 2017. 5. 30..
 */
// var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var Users = require('../../models/user');

module.exports = function (passport) {

  // console.log('passport setting start');

    passport.serializeUser(function (user, done) {
        done(null, user);
    });

    passport.deserializeUser(function (user, done) {
        done(null, user);
    });

<<<<<<< HEAD
    passport.use('sign_in',new LocalStrategy({
        usernameField: 'Id',
        passwordField: 'Password',
    }, function(req, id, password, done) {
        console.log(id);
        console.log(password);
        Users.findOne({ 'username' : id }, function(err, user) {
            if (err)
                return done(err);
            if (!user)
                return done(null, false, req.flash('loginMessage', '사용자를 찾을 수 없습니다.'));
            if (!user.validPassword(password))
                return done(null, false, req.flash('loginMessage', '비밀번호가 다릅니다.'));
            return done(null, user);
        });
    }));
    passport.use('sign_up', new LocalStrategy({
            usernameField: 'Id',
            passwordField: 'Password',
            passReqToCallback : true
=======
    passport.use('local-signin', new LocalStrategy(
        function(username, password, done) {
            Users.findOne({ 'username' : username }, function(err, user) {
                if (err)
                    return done(err);
                if (!user)
                    return done(null, false, req.flash('loginMessage', '사용자를 찾을 수 없습니다.'));
                if (!user.validPassword(password))
                    return done(null, false, req.flash('loginMessage', '비밀번호가 다릅니다.'));
                return done(null, user);
            });
        }));


    passport.use('signup', new LocalStrategy({
          //  usernameField : 'id',
        //    passReqToCallback : true
>>>>>>> 8694eb8355b5404d581a573abe7ea7b75b2a6869
        },
        function(req, id, password, done) {
            console.log("sign");
            Users.findOne({ 'username' : id }, function(err, user) {
                if (err) return done(err);
                if (user) {
                    return done(null, false, req.flash('signupMessage', '이메일이 존재합니다.'));
                } else {
                    var newUser = new User();
                    console.log("2");
                    newUser.name = req.body.name;
                    newUser.username = id;
                    newUser.password = newUser.generateHash(password);
                    newUser.save(function(err) {
                        if (err)
                            throw err;
                        return done(null, newUser);
                    });
                }
            });
        }));

};
