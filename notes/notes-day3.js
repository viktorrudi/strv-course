// find eslint checker for vscode (activate in settings)

//Makefile (mac)
// Remember to set up scripts in package.json

// npm audit - checks for vulnerabilities (that has been reported) in installed packages
// has more tools than just installing and audit

//.editorconfig
// config for the editor. configure formatting and more

//commitlint
// semantic-release
// need to learn more about how this works

// "node ." runs index.js
// "node --inspect-brk" can find in "chrome://inspect". Use breakpoints to read more info. Can se much mor info in the code by hovering
// vscode also has something similar

// command "n" to switch node version (with npm i -g n)

// networking>
// UDP/TCP
// UDP - unstable delivery. sends data to one place, and doesn't care if it gets lost. doesn't guarantee a response.
// Example usage: video streams.
// TCP - steady delivery. waits until the response. a stateful connection - mutual connection. connected until disconnect
// Example usage: sending a video file.

//Koa>
// Compressor
// Body parser, parses content depending on the content-type - npm i koa-bodypaser

// Put metadata into headers, not into body
// ctx.set
// Custom headers were made with X-name. Now you should use something meaningful (such as the domain). Use dashes in between words

// Stopping server by waiting for all responses to finish. E.g like opening a page, half of it could be loaded.
// Attach a signal handler to gracefully stop the server
// Ctrl + C = SIGINT
// Do not use process.exit(). Better to use throw new Error('...') and wrap it into a setTimeout().unref(). It would call the error if the server failed to close within specified setTimeout time
// closing of connections has to happen in a proper order. Terminate http connection first. Wait until its done, and then terminate others (on how they depend on each other). Can be difficult

// instead of using console.log(), use pino (npm). Log can be filtered to only show errors. Can also be for storing somewhere to inspect e.g. server crashes. Check out its API (commands)

// Koa can use async/await, and has a smaller core with many middlewares to combine for the services purposes

//Homework
// Implement a simple REST endpoint where you have an article (some simple object). Implement with REST for how to implement that API
// Router.get('/articles')
// Router.get('/articles/:id')
// Router.delete('/articles/:id')
// Router.patch('/articles/:id')

// Use global array for the object (or find something better (bonus))

// const article = {
//   id: '123',
//   text: 'hola'
// }

//Also add eslint
//set up logging with Pino - read its doc. Every time a req is made , log it. Not only when trying to target something specific from the API, but all CRUD requests




