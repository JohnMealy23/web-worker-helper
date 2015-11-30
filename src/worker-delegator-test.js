var workerController = require('../src/worker-delegator.js');

function exampleFunction(argObj) {
    var keys = Object.keys(argObj);
    var key;
    var value;
    var random;
    var string = '';
    var i;
    for(i=0; i<keys.length; i++) {
        key = keys[i];
        value = argObj[keys[i]];
        random = (Math.floor(Math.random() * 10) + 1) * 1000;
        setTimeout(function() {
            console.log('Key: ' + this.key + '. Value: ' + this.value + '. Time: ' + this.random);
        }.bind({key:key, value:value, random:random}),random);
        string += value + ' ';
    }
    return string;
}

var exampleObj = {
    a: 'well',
    b: 'hello',
    c: 'there',
    d: 'old',
    e: 'boy'
};

workerController(exampleFunction, exampleObj).then(function(x) {console.log(x);});
