const math = require('./math');
const util = require('util');

for(var num =1; num < 80; num++) {
  let now = new Date().toISOString();
  console.log(`${now} fib for ${num} = ${math.fibonacci(num)}`);
}