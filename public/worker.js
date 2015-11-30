onmessage = function(e) {
	'use strict';
	var processFn = (payload) => {
		var customFn = new Function('argObj', 'return ' + payload.fn + '.call(self,argObj);');
		var value = customFn(payload.argObj);
		return value;
	}
	var data = JSON.parse(e.data);
	var reply = JSON.stringify({
		payload: processFn(data.payload),
		promiseIndex: data.promiseIndex
	});
	postMessage(reply);
};