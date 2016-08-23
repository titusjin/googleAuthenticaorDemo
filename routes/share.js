var express = require('express');
var path    = require("path");
var router  = express.Router();

router.get('/', function(req, res, next) {
    res.render('share/check',
        {
            description: 'check facebook share',
            inputAlert : '請輸入url'
        }
    );
});

// router.get('/hello/', function(req, res, next){
//     var sess = req.session;
//     if(sess.name){
//         console.log('hello');
//     }else{
//         console.log('shoot~~~');
//     }

//     sess.name = 'titus';
//     res.json('{name: titus}');
// });

router.post('/firstLogin', function(req, res, next) {
    var username = req.body.username;
    var password = req.body.password;

    var firstAuthResult = auth.firstAuth(username, password);
    if(firstAuthResult){
        var secret = speakEasy.generateSecret();
        // var url = speakEasy.otpauthURL({ secret: secret.ascii, label: 'Name of Secret', algorithm: 'sha512' });

        console.log('secret is : ' + secret);
        console.log('secret base32 is : ' + secret.base32);

        req.session.authKey = secret.base32;

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
      secret: sessionsecret,
      encoding: 'base32',
      token: token
    });

    if(verified){
        res.render('login/welcome', {description: 'We make the site as secure as u wish'});
    }else{
        res.render('login/login', {description: ' Sorry ! U have to login again.'});
    }

});

router.get('/callback/:uid', function(req, res, next){
    console.log('the uid is : '+req.params.uid);
    auth.test1(function(result){
        if(result){
            auth.test2(function(){
                return res.json({name: 'jin',age:38});
            });
        }
    });
});

module.exports = router;
