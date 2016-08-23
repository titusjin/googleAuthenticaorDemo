const fs = require('fs');
const gm = require('gm');
const Promise = require('promise');
const Path = require('path');

// every json file can be loaded by require operator
// and once loaded would be js object
var testJson = require('./package.json');

console.log(typeof testJson);

testJson.getDependencies = () =>{
    console.log(typeof testJson.dependencies);
    testJson.dependencies.
    console.log(testJson.dependencies);
};
testJson.getDependencies();


function copyFileCallback(err){
    if(err){
        console.error(err);
        return false;
    }else{
        console.log('file content copy complete.');
        fs.stat('./titus/2016-7/name.txt', (err) => {
            if(!err){
                console.log('the file do exists.');
                return true;
            }else{
                console.error(err);
                return false;
            }
        });
    }
}

const copyFileStream = fs.createReadStream('./app.js');

var mkNestedFolder = function(folderName, callback){
    fs.mkdir(folderName, (err, fd) => {
        if(err && err.code == 'ENOENT'){
            mkNestedFolder(Path.dirname(folderName));
            mkNestedFolder(folderName, callback);
        }
    });
}

var copyFile = function(name, stream , callback){
    fs.appendFile(name, stream, callback);
}

var doCopy = function(folderName, result){

    var dateObj = new Date();
    var month = dateObj.getUTCMonth() + 1;
    var year = dateObj.getUTCFullYear();

    var subFolderName = folderName + '/' + year + '-' + month;

    mkNestedFolder(subFolderName, function(){
        copyFile(subFolderName + '/name.txt', copyFileStream._readableState.buffer, copyFileCallback);
    });
}


// make mkdir function as one promise object
// var mkdir = Promise.denodeify(fs.mkdir);

// mkdir('./titus').then(
//     function(){
//         doCopy('./titus');
//     },
//     function(err){
//         if(err.code == 'EEXIST'){
//             docopy('./titus');
//         }
//     }
// ).then(
//     function(){
//         console.log('everything is done!!');
//     }
// );


// New test for promise object
var doTest = function(name){
    console.log('hello ' +  name);
    return false;
}
var p1 = new Promise(function(resolve, reject){
    if(doTest('titus')){
        console.log('we here..');
        resolve('DONE');
    }else{
        reject('fail');
    }
});

p1.then(function(successMessage){
    console.log(successMessage);
}, function(failMessage){
    console.log(failMessage);
});

var v = {};
v.sayHello = (name) => {
    console.log('hello ' + name);
};
v.sayMore = (message) => {
    v.sayHello(message);
};

console.log('v.sayHello is : ' + typeof v.sayHello);
console.log('v.sayMore is : ' + typeof v.sayMore);

v.sayMore('world');


// mkNestedFolder('./titus/haha', function(){
//     console.log('finished');
// });

// p1.then(
//     function(){
//         fs.mkdir('./titus', (err) => {
//             if(!err || err.code == 'EEXIST'){
//                 var dateObj = new Date();
//                 var month = dateObj.getUTCMonth() + 1;
//                 var year = dateObj.getUTCFullYear();

//                 var subFolderName = './titus/' + year + '-' + month;

//                 fs.mkdir(subFolderName, (err, fd) => {
//                     copyFile(subFolderName + '/name.txt', copyFileStream._readableState.buffer, copyFileCallback);
//                 });

//                 // console.log('ready to gm the image');
//                 // gm('./public/images/1.jpg').resize('20', '20').write('./public/images/2.jpg', (err) => {
//                 //     if(!err){
//                 //         console.log('resize finished.');
//                 //     }
//                 // });

//             }else{
//                 console.error(err);
//             }
//         });
//     }
// );


