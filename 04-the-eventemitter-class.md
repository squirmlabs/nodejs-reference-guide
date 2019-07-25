The EventEmitter Class

The `EventEmitter` object is defined in the events module of Node.js
Directly using the `EventEmitter` class means performing 

```js
require('events')
```

In most cases you'll use an existing object or package that uses the `EventEmitter` internally. This won't require you to require the module directly.
However, there are some cases where needs dictate implementing an `EventEmitter` subclass.

Define a `Pulse` class that inherits from `EventEmitter`.

```js
const EventEmitter = require("events");

export class Pulse extends EventEmitter {
  start() {
    setInterval(() => {
      console.log(`${new Date().toISOString()} >>> pulse`);
      this.emit("pulse");
      console.log(`${new Date().toISOString()} <<< pulse`);
    }, 1000);
  }
}

```

The purpose of this `Pulse` class is to send a timed event, once a second, to any listeners. This is key. We can use this like a `Master Clock`.

The `start` method uses the `setInterval` to kick off repeated callback execution, scheduled for each second, calling `emit` to send the `pulse` events to any listeners.

```js

const MasterClock = require("./04-the-eventemitter-class");

// Instantiate a MasterClock object
const masterTime = new MasterClock();

// Handler function
masterTime.on("clock", () => {
  console.log(`${new Date().toISOString()} time recieved`);
});

// Start masterTime
masterTime.start();


```

Here we create a `MasterClock` object to consume its `clock` events.
Calling `masterTime.on` sets up connections for the `clock` events to invoke the callback function.
It then calls the `start` method to get the process going.

Note: Older releases of Node.kjs would require usage of util.inherits
Note: Since we are using an arrow function for `setInterval`, `this.emit` refers to the `Pulse` object. Before `ES2015 arrow function`, when our callbacks used a regular `function`. `this` would have referred to the object related to the `setInterval` function.

Note: If you wanted a simple `EventEmitter` but with your own class name, the body of the extended class can be empty.

```js

class Heartbeat extends EventEmitter {}
const beatMaker = new HeartBeat();

```




