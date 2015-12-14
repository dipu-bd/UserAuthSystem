var express = require('express');
var router = express.Router();

var config = {
    site_lang: "en",
    site_title: "User Authentication System",
    site_description: "A simple user authentication system developed with node.js",
    site_name: "UserAuthSystem",
    site_type: "website",
    site_image: "",
    site_url: "",
    page: ""
};

/* GET home page. */
router.get('/', function (req, res, next) {
    config.page = "home";
    res.render('index', config);
});

/* GET login page. */
router.get('/login', function (req, res, next) {
    config.page = "login";
    res.render('index', config);
});

/* GET register page. */
router.get('/register', function (req, res, next) {
    config.page = "register";
    res.render('index', config);
});

/* POST request for login. */
router.post('/login', function (req, res, next) {
    console.log(req.body);
    res.send('Hello ' + req.body.username + ' ! this is login form :) ');
});

/* POST request for registration. */
router.post('/register', function (req, res, next) {
    console.log(req.body);
    res.send('Hello ' + req.body.username + ' ! this is login form :) ');
});

module.exports = router;
