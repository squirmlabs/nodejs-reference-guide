## Computationally intensive code and the Node.js event loop

The Fibonacci example is purposely inefficient to demonstrate an important consideration for our applications.

So what happens when we have 2 windows opened to the fibonacci form? If we enter 10 in one and 55 in the other, the second window freezes. If we leave it running long enough, the answer will eventually pop up in both windows.

What happens to the Node.js event loop when running long computations?

Node.js event loop is blocked from processing events because the fibonacci algorithm is running and does not ever yield to the event loop.

Node.js has a single execution thread, processing requests depend on request handlers quickly returning to the event loop. Normally, the asynchronous coding style ensures that the event loop executes regularly.

Because the asynchronous I/O is non-blocking and control is quickly returned to the event loop.

To see more clearly, create a file named `fibotimes.js` containing the following code:

```js
const math = require('./math');
const util = require('util');

for(var num =1; num < 80; num++) {
  let now = new Date().toISOString();
  console.log(`${now} fib for ${num} = ${math.fibonacci(num)}`);
}
```

Then run 
```sh
node fibotimes.js 
```

Which results to the following output:

```sh

2019-07-25T06:06:21.513Z fib for 1 = 1
2019-07-25T06:06:21.515Z fib for 2 = 1
2019-07-25T06:06:21.515Z fib for 3 = 2
2019-07-25T06:06:21.515Z fib for 4 = 3
2019-07-25T06:06:21.515Z fib for 5 = 5
2019-07-25T06:06:21.515Z fib for 6 = 8
2019-07-25T06:06:21.515Z fib for 7 = 13
2019-07-25T06:06:21.515Z fib for 8 = 21
2019-07-25T06:06:21.515Z fib for 9 = 34
2019-07-25T06:06:21.515Z fib for 10 = 55
2019-07-25T06:06:21.515Z fib for 11 = 89
2019-07-25T06:06:21.515Z fib for 12 = 144
2019-07-25T06:06:21.515Z fib for 13 = 233
2019-07-25T06:06:21.515Z fib for 14 = 377
2019-07-25T06:06:21.516Z fib for 15 = 610
2019-07-25T06:06:21.516Z fib for 16 = 987
2019-07-25T06:06:21.516Z fib for 17 = 1597
2019-07-25T06:06:21.517Z fib for 18 = 2584
2019-07-25T06:06:21.517Z fib for 19 = 4181
2019-07-25T06:06:21.517Z fib for 20 = 6765
2019-07-25T06:06:21.517Z fib for 21 = 10946
2019-07-25T06:06:21.518Z fib for 22 = 17711
2019-07-25T06:06:21.518Z fib for 23 = 28657
2019-07-25T06:06:21.518Z fib for 24 = 46368
2019-07-25T06:06:21.519Z fib for 25 = 75025
2019-07-25T06:06:21.519Z fib for 26 = 121393
2019-07-25T06:06:21.520Z fib for 27 = 196418
2019-07-25T06:06:21.522Z fib for 28 = 317811
2019-07-25T06:06:21.524Z fib for 29 = 514229
2019-07-25T06:06:21.528Z fib for 30 = 832040
2019-07-25T06:06:21.535Z fib for 31 = 1346269
2019-07-25T06:06:21.546Z fib for 32 = 2178309
2019-07-25T06:06:21.563Z fib for 33 = 3524578
2019-07-25T06:06:21.591Z fib for 34 = 5702887
2019-07-25T06:06:21.635Z fib for 35 = 9227465
2019-07-25T06:06:21.705Z fib for 36 = 14930352
2019-07-25T06:06:21.818Z fib for 37 = 24157817
2019-07-25T06:06:22.004Z fib for 38 = 39088169
2019-07-25T06:06:22.306Z fib for 39 = 63245986
2019-07-25T06:06:22.798Z fib for 40 = 102334155
2019-07-25T06:06:23.592Z fib for 41 = 165580141
2019-07-25T06:06:24.875Z fib for 42 = 267914296
2019-07-25T06:06:26.946Z fib for 43 = 433494437
2019-07-25T06:06:30.309Z fib for 44 = 701408733
2019-07-25T06:06:35.915Z fib for 45 = 1134903170
```

There are 2 general ways to solve this problem in Node.js

* Algorithmic refactoring - The algorithm is suboptimal and can be rewritten to be faster. If not faster, it can be split into callbacks dispatched through the event loop.

* Creating a backend service - It's quite common to implement backend servers to offload work from frontend servers.

## Algorithmic refactoring


