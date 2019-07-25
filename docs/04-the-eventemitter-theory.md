With the `EventEmitter` class, your code emits events that other code can recieve. It's one way of connecting two seperated sections of your program.

Its kind of like how quantum entanglement means two electrons can communicate with each other from any distance.

In other words, event names are defined by calling `.emit` with the event name.

There's no formal to do and no registry of event names. So, making a call to `.emit` is enough to define an event name.

You can defined as many event names as you like and the event name can be anything that makes sense to you.

An object sends events to any listeners that have registered to recieve events from the object using the `.emit` function.

The program registers to receive an event by calling that object's `.on` method, giving the event name and an event handler function.

Each instance of an `EventEmitter` object manages its own set of listeners and distributes its events to those listeners.

By adding the data as arguments to the `.emit` call, you can send data along with an event.

```js
this.emit("clock", data1, data2);
```

When a registered program is listening to an event, and then receives that event, the data is available as arguments to the callback function.

It is important to note that there is no handshake necessary between the EventEmitter's event and event listener. It is a stateless procedure. 

The event sender goes on with its business, and it gets no notification about any events received, actions taken, or error that may occur.

```js
emitter.on("clock", (data1, data2, ...rest) => {
  // action on receiving the event
  console.log("LOGGER: data1", data1)
  console.log("LOGGER: data2", data2)
});
```
 
