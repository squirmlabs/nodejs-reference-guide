## Middleware and request paths

We've seen 2 kinds of middleware functions so far. In one, the first argument is the handler function. In the other, the first argument is a string containing a URL snippet, and the second argument is the handler function.

What makes this possible is how `app.use` has an optional first argument.

The path the middleware is mounted on is an optional argument.

The `path` is a pattern match against the request URL, and the given function is triggered if the URL matches the pattern. 

There's even a method to supply named parameters in the URL.

In this example, we're suggesting a user profile service, and that for this URL we want to display information about the named user.

```js
app.use('/user/profile/:id`, function(req, res, next) {
  userProfiles.loolkup(req.params.id, (err, profile) => {
    if(err) return next(err);
    // do something with the profile
    // Such as display it to the user
    res.send(profile.display());
  });
});
```

This path specification has a pattern, :id, and the value will land in req.params.id.

## Another way to use a middleware function

Another way is to use middleware function on a specific HTTP Request method.

With `app.use`, any request will be matched, but in truth, `GET` requests are supposed to behave differently to `POST` requests.

You call `app.METHOD` where `METHOD` matches one of the HTTP request verbs. That is, `app.get` matches the `GET` method, `app.post` matches `POST`, and so on.

## The Router object

This is a kind of middleware used explicitly for routing requests based on their URL.

Example `routes/users.js`

```js
const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
```
This is a module whose `exports` object is a router. This router has only one route, but it can have any desired number of routes.

in `app.js`, this is added as follows:

```js
app.use('/users', users);

```

All the functions for the `app` object apply to the `router` object.

If the request matches, the router is given the request for its own chain of processing functions.

An important detail is that the request URL prefix is stripped when the request is passed to the router instance.

Notice that the `router.get` in `users.js` matches `/` and that this router is mounted on `/users`. 

In effect, that `router.get` matches `/users` as well, but because the prefix was stripped, it specifies `/` instead. 

The router can be mounted on different path prefixes without having to change the router implementation.
