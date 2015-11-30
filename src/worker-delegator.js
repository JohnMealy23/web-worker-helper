var myWorker = new Worker("worker.js");
var promiseLib = require('when');

var workerController = (function() {
    'use strict';
    var promiseRegistry = [];
    var index = 0;
    myWorker.onmessage = function(e) {
        try {
            var data = JSON.parse(e.data);
            promiseRegistry[data.promiseIndex](data.payload);
            delete promiseRegistry[data.promiseIndex];
        } catch(e) {
            console.error('Could not parse web worker data',e);
        }
    };
    return function(fn, argObj) {
        var payload = {
            fn: "" + fn,
            argObj: argObj
        };
        return promiseLib.promise(function (resolve, reject) {
            var dataString = JSON.stringify({
                payload: payload,
                promiseIndex: index
            });
            promiseRegistry[index] = resolve;
            myWorker.postMessage(dataString);
            index++;
        });
    };
})();

window.workerController = workerController;

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

window.workerController(exampleFunction, exampleObj).then(function(x) {console.log(x);});

module.exports = workerController;