var express = require('express');
var path    = require("path");
var router = express.Router();

var auth = require('../helper/auth.js');
var speakEasy = require('speakeasy');
var QRCode = require('qrcode');

/* GET login page. */
router.get('/', function(req, res, next) {
    // res.sendFile(path.join(__dirname, '../views', '/login/login.html'));
    res.render('login/login', {description: '2-step authentication reponsive Login Template'});
});

router.post('/firstLogin', function(req, res, next) {
    var username = req.body.username;
    var password = req.body.password;

    var firstAuthResult = auth.firstAuth(username, password);
    if(firstAuthResult){
        var secret = speakEasy.generateSecret();
        var url = speakEasy.otpauthURL({ secret: secret.ascii, label: 'Name of Secret', algorithm: 'sha512' });

        req.session.authKey = secret;

        console.log(req.session);

        QRCode.toDataURL(secret.otpauth_url, function(err, url) {
            res.render('login/qrcode',{qrSRC : url});
        });
    }
});

router.post('/secondAuth', function(req, res, next){
    var token = req.body.twoAuthToken;

    var sessionsecret = req.session.authKey;
    console.log(req.session);

    var verified = speakEasy.totp.verify({
      secret: sessionsecret.base32,
      encoding: 'base32',
      token: token
    });

    if(verified){
        res.render('login/welcome', {description: 'We make the site as secure as u wish'});
    }else{
        res.render('login/login', {description: ' Sorry ! U have to login again.'});
    }

});

module.exports = router;
