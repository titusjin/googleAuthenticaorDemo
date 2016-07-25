const Path = require('path');
const gm = require('gm');
const fs = require('fs');
var Crypto = require('crypto');


var sha256 = Crypto.createHash('sha256');
sha256.update('123456');

console.log(sha256.digest('hex'));


// fs.access(Path.join(__dirname, './desktop/test.jpg'), fs.R_OK | fs.W_OK, (err) =>{
//         if(err){
//             console.log('ready to make the dir');
//             fs.mkdir('./desktop');
//         }else{
//             console.log('directorty already exists.');
//         }
// });

// fs.stat('./desktop/', (err, stats) => {
//     if(err){
//         console.err(err);
//         fs.mkdir('./desktop');
//     }else{
//         console.log(stats);
//         console.log('directorty already exists.');
//     }
// });

// gm(Path.join(__dirname, './tempdownloads/2016-06-02-5687480e-de17-4e3c-bdc2-9ac76764694c.jpg'))
// .crop(100, 100, 0, 0).write( './desktop/final.jpg', function (err) {
//     if (!err){
//         console.log('GOT IT');
//     }else{
//         console.error(err);
//     }
// });