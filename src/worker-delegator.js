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

module.exports = workerController;