var express = require('express');
var database = require('./database');
var config = require('../config/site');

var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    if (req.cookies.user) {
        res.redirect('/profile');
    }
    else {
        config.page = "home";
        config.msg = null;
        res.render('index', config);
    }
});

/* GET login page. */
router.get('/login', function (req, res, next) {
    config.page = "login";
    config.msg = null;
    res.render('index', config);
});

/* GET register page. */
router.get('/register', function (req, res, next) {
    config.page = "register";
    config.msg = null;
    res.render('index', config);
});

/* GET profile page. */
router.get('/profile', function (req, res, next) {
    if (req.cookies.user) {
        config.page = "profile";
        config.msg = null;
        config.user = req.cookies.user;
        res.render('index', config);
    }
    else {
        res.redirect("/login");
    }
});

/* GET logout page. */
router.get('/logout', function (req, res, next) {
    res.clearCookie("user", { });
    res.redirect("/");
});

/* POST request for login. */
router.post('/login', function (req, res, next) {
    database.checkUser(req.body.username, req.body.password, function (err, user) {
        if (err) {
            config.page = "login";
            config.msg = err;
            res.render('index', config);
        }
        else {
            res.cookie("user", user, {maxAge: 30 * 24 * 3600000});
            res.redirect('/profile');
        }
    });
});

/* POST request for registration. */
router.post('/register', function (req, res, next) {
    database.addUser(req.body.username, req.body.email, req.body.password, function (err, user) {
        if (err) {
            config.page = "register";
            config.msg = err;
            res.render('index', config);
        }
        else {
            res.cookie("user", user, {maxAge: 30 * 24 * 3600000});
            res.redirect('/profile');
        }
    });
});

module.exports = router;
