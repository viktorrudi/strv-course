'use strict';
const events = require('events');

const eventEmitter = new events.EventEmitter()

eventEmitter.on('test', ()=>{
  console.log('test123123123123213')
})

eventEmitter.emit('test')