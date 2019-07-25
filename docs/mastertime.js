const MasterClock = require("./04-the-eventemitter-class");

// Instantiate a MasterClock object
const masterTime = new MasterClock();

// Handler function
masterTime.on("clock", () => {
  console.log(`${new Date().toISOString()} time recieved`);
});

// Start masterTime
masterTime.start();
