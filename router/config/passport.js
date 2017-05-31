/**
 * Created by Choichanghyun on 2017. 5. 30..
 */
//var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcrypt-nodejs');
var async = require('async');
var Users = require('../../models/user');

module.exports = function (passport) {
    passport.serializeUser(function (user, done) {
        done(null, user);
    });

    passport.deserializeUser(function (user, done) {
        done(null, user);
    });

    passport.use('signin',new LocalStrategy({
        usernameField: 'id',
        passwordField: 'password',

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
    passport.use('signup', new LocalStrategy({
            usernameField: 'id',
            passwordField: 'password',
            passReqToCallback : true
        },
        function(req, id, password, done) {
            console.log(id);
            console.log(password);
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