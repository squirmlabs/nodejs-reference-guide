## Error Handling

In the express app generated `app.js`, the `404 Error page not found`, and any other errors in the application might want to show to the user, is what we will focus on now.

A middleware function indicates an error by passing a value to the `next` function call.

Once Express sees an error, it will skip any remaining non-error routing, and it will only pass it to the error handlers instead.

An error handler function has a different signature than we saw with `app.use` or `app.METHOD`.

Error handler functions take four parameters, with `err` added to the familiar `req`, `res`, and `next`. For this handler, we user `res.status` to set the HTTP response status code, and we use `res.render` to format an HTML response using the `views/error.hbs` template. 

The `res.render` function takes data, rendering it with a template to produce HTML.

Any error in our application will land here, bypassing any remaining middleware functions.

```js
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
```
