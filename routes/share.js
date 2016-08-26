var express = require('express');
var path    = require("path");
var router  = express.Router();
var Request = require('request');

router.get('/', function(req, res, next) {
    res.render('share/check',
        {
            description: 'check facebook share',
            inputAlert : '請輸入url'
        }
    );
});

router.post('/', function(req, res, next) {

    var articleUrl = req.body.articleUrl;

    if(articleUrl){
        // console.log(articleUrl);
        var options = {
              uri : 'https://graph.facebook.com/v2.7/' + articleUrl + '?access_token=917307478388825|ba750704881d6d0c1cb3c7245c37af31',
              method :  'GET',
              headers:  {
                  'Cache-Control': 'private, no-cache, no-store, must-revalidate',
                  'Expires': '-1',
                  'Pragma': 'no-cache'
              }
        };


        Request(options, function (err, response, body) {
            if (err) {
                return callback(err);
            };

            var statusCode = response.statusCode;
            switch(statusCode){
                case 200 :
                    try{
                        var parsed = JSON.parse(body);
                        console.log(parsed);
                        res.render('share/result',
                            {
                                queryUrl: articleUrl,
                                count: parsed.share.share_count
                            }
                        );
                    }catch(err){
                        console.error(err);
                    }

                    break;
                case 404 :
                    console.log('404 Not Found.');
                    break;
                default :
                    console.log('api call error : ' + body);
            }
          });

    }else{
        console.log('NO query param');
        res.render('share/error',
            {
                description: 'check facebook share',
                inputAlert : '請輸入url'
            }
        );
    }
});

module.exports = router;
