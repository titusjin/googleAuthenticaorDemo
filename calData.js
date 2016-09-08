'use strict';

const _ = require('lodash');
const base = [3179, 10183];

const data = [
    [21281,   77761],
    [59872,  215589],
    [76810,  266474],
    [94393,  320383],
    [116499, 387432],
    [127695, 422275],
    [131101, 433072],
    [135194, 445302],
    [136577, 449324]
];

var index = 0;

function cal(){
    var temp = [];
    _.forEach(data, function(row){
        if(index == 0){
            row[0] = row[0] - base[0];
            row[1] = row[1] - base[1];
            row[2] = row[0]/row[1]*100 + '%';
        }else{
            row[0] = row[0] - temp[index -1][0];
            row[1] = row[1] - temp[index -1][1];
            row[2] = row[0]/row[1]*100 + '%';
        }

        temp[index] = row;
        index++;
    });

    console.log(temp);
}

cal();