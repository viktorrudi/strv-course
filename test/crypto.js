const crypto = require('crypto')
const bcrypt = require('bcrypt')

const test1 = crypto.createHmac('sha1', 'test')
// .update('test2')
.digest('hex')

console.log(test1);
