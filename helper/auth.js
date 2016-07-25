var speakEasy = require('speakeasy');
var QRCode = require('qrcode');

var auth = {};

auth.firstAuth = function(username, password){
    console.log('in firstAuth funciton..');

    // frist ignore the username and passworld check
    return true;
}

auth.generateQRCode = function(){
    console.log('hello generateQRCode');

    var secret = speakEasy.generateSecret({length: 20});

    // console.log(secret.base32); // secret of length 20

    // dataQRCode.toDataURL(secret.otpauth_url, function(err, data_url) {
    //     console.log(data_url); // get QR code data URL
    //     return data_url;
    // });
}

auth.test1 = function(callback){
    console.log('ready to call callback');
    callback(true);
}

auth.test2 = function(callback){
    callback();
}

module.exports = auth;
