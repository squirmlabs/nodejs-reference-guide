## The Express middleware

First things first. The ordering of middleware execution depends on the order they're added to the app object. The first added is executed first, and so on.

Let's discover what middleware functions do for our application.

```js
app.use(function(req, res, next) {
  const err = new Error("Not found");
  err.status = 404;
  next(err);
});
```
`HTTP 404` status means the requested resource was not found.

It's the programmer's job to tell the user their request wasn't satisfied. Its the UX/Product Designer's job to provide the engineer a picture of a flock of birds pulling a whale out of the ocean.

Before they even do this, they should understand what middleware is.

`Middleware` functions are functions that have access to the `request object (req)`, the `response object (res)`, and the `next` function in the application’s request-response cycle.

The `next` function is a function in the Express router which, when invoked, executes the middleware succeeding the current middleware.

`Middleware` functions can perform the following tasks:

- Execute any code.
- Make changes to the request and the response objects.
- End the request-response cycle.
- Call the next middleware in the stack.

`Middleware` functions take three arguments.

The `request object (req)`, the `response object (res)`, which are equivalent to the `request` and `response` of the Node.js HTTP request object.

Express expands the objects with addition data and capabilities.

The last argument is `next`, which is a callback function controlling when the request-response cycle ends.

`next` can be used to send errors down the middleware pipeline.

The incoming request gets handled by the first middleware function, then the next, then the next, and so on.

The request is passed down the chain of middleware functions, the `next` function is called.

If `next` is called with an error object, and error is being signaled. Otherwise, the control simple passes to the next middleware function in the chain.

A middleware function gives a response when it calls functions on the `response` object, such as `res.send` or `res.render`.

For example, this does not call `next`, but instead calls `res.send`. This is the correct method of ending a request-response cycle, by sending a response `res.send` to the request. If neither `next` nor `res.send` is called, the request never gets a response.

```js
app.get("/", function(req, res) {
  res.send("Welcome to Basstap Records!");
});
```

If the current middleware function does not end the request-response cycle, it must call `next()` to pass control to the next middleware function. Otherwise, the request will be left hanging.

<Image from API docs goes here>

- HTTP method for which the middleware function applies.
- Path (route) for which the middleware function applies.
- The middleware function.
- Callback argument to the middleware function, called "next" by convention.
- HTTP response argument to the middleware function, called "res" by convention.
- HTTP request argument to the middleware function, called "req" by convention.

A middleware function does one of the following four things:

- Executes its own business logic
- Modifies the request or response objects. The `body-parser` and `cookie-parser`, look for the data to add to the request object.
- Calls `next` to proceed to the next middleware function or else signals an error.
- Sends a response, ending the cycle.


