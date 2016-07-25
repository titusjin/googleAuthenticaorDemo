var testMiddle = {
    hello: function(req, res, next){
            console.log('YES!!!!!');
            next();
        }
}

module.exports = testMiddle;