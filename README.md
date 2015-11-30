# web-worker-helper
A simple utility for pushing function execution to an alternate thread.  Abstracted, so that any function and its arguments can be deferred to the worker with the following: workerController(fn, argObj); 

To initialize, `npm install`, `grunt`, `node app.js`, then visit http://localhost:8080/workertest.html and open up your console.  Open dist.js in the developer tools sources panel.  Search for and set a breakpoint on the following line:
`window.workerController(exampleFunction, exampleObj)`

Step through the code as the example function is called in a separate thread, and the value is sent back to the initial thread.