var file = require('fs');

// console.log(module.paths);



var readFileCallback = function(err, data){
    console.log('in read file call-back function--');
    console.log(data);
}

file.readFile('/etc/hosts', 'utf8', readFileCallback);

file.unlink('./aaa.js', (err) => {
    console.log(err ? err : 'nothing' );
});
