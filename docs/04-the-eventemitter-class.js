const EventEmitter = require("events");

class Clock extends EventEmitter {
  start() {
    setInterval(() => {
      console.log(`${new Date().toISOString()} >>> time`);
      this.emit("clock");
      console.log(`${new Date().toISOString()} <<< time`);
    }, 1000);
  }
}
module.exports = Clock;
