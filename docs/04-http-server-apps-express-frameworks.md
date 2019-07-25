The HTTPServer object is very close to the HTTP protocol.

Its better to abstract away the HTTP details and concentrate on your application.

Express is the most popular.

Koa should be considered because it was developed by the same team and has fully integrated support for async functions.

One reason to use a web framework is that they often provide the best practices used in web application development for 20 years.

## Best practices

- Providing a page for bad URLs
- Screening URLs and forms for any injected scripting blocks
- Supporting the use of cookies to maintain sessions
- Logging requests for both usage tracking and debugging
- Authentication
- Handling static files, such as images, CSS, Javascript, or HTML
- Providing cache control headers to caching proxies
- Limiting things such as page size or execution time

Abstracting away details is a time-honored way for programmers to be more efficient. This is especially true when using a library or framework providing prepackaged functions that take care of the details.

## Create Express Fibonacci Calculator

```$
mkdir fibonacci
cd fibonacci
npm init
...
npm install express-generator@4.x
```

The resulting `express` command is installed in the `./node_modules/.bin/express` directory. This allows us to run the following command.

```$
./node_modules/.bin/express --help
```

Now that we installed `express-generator` in the fibonacci directory, run the following.

```$
./node_modules/.bin/express --view=hbs --git .
```

This created a directory of files for us.

```$
create : public/
   create : public/javascripts/
   create : public/images/
   create : public/stylesheets/
   create : public/stylesheets/style.css
   create : routes/
   create : routes/index.js
   create : routes/users.js
   create : views/
   create : views/error.hbs
   create : views/index.hbs
   create : views/layout.hbs
   create : .gitignore
   create : app.js
   create : package.json
   create : bin/
   create : bin/www

   install dependencies:
     $ npm install

   run the app:
     $ DEBUG=fibonacci:* npm start
```

The next thing to do is run the blank application in the way we are told. The command shown, `npm start`, relies on a section of the supplied `package.json` file

```json

"scripts":{
    "start": "node ./bin/www"
}

```

The `npm` tool supports scripts that are ways to automate various tasks. When the Twelve-Factor Application model suggests automating all your administrative tasks, the `npm` scripts feature is an excellent mechanism to do so. Most `npm` scripts are run with the `npm run scriptName` command, but the `start` command is explicitly recognized by `npm` and can be run as show previously.

The `DEBUG` variable turns on some debugging output, which includes the message about what port express is running.

## Walking through the default Express application

A template engine makes it possible to insert data into generated web pages.

The `hbs` extension is used for Handlebars files.

The `views` contains two files, `error.hbs` and `index.hbs`.

`layout.hbs` is the default page layout.

`routes` directory contains the initial routing setup. This handles specific URL's.

`public` directory will contain assets that the application doesn't generate, but are simply sent to the browser. Css is initially installed `public/stylesheets/style.css.

`package.json` file contains application dependencies and other metadata.

`bin` directory contains the `www` script that we saw earlier.
This is a Node.js script that initializes the `HTTPServer` objects, starts listening on a TCP port, and calls `app.js`. These scripts together, initialize Express, hook up the routing modules, and more.

## Application Initialization

`app.js` is a module that exports the object returned by the `express` module. It doesn't start the HTTP server object.

```js
const express = require('express');
...
const app = express();
...
modules.exports = app;
```

### WWW Script

The first thing we see is the use of a Unix/Linux technique to make a command script.

```$
#!/user/bin/env node
```

It says to run the following as a script using the `node` command.

In other words, we have Node.js code and we're instructing the operating system to execute that code using the Node.js runtime:

We can also see that the script was made executable by `express-generator`

```$
ls -l bin/www
-rwxr-xr-x  1 fabric  staff  1595 Jul 15 13:22 bin/www
```

```www

const app = require("../app");
const debug = require("debug")("fibonacci:server");
const http = require("http");

const port = normalizePort(process.env.PORT || "3000");
app.set("port", port);


const server = http.createServer(app);

server.listen(port);
server.on("error", onError);
server.on("listening", onListening);
```

Port `3000` comes from; its a parameter to the `normalizePort` function.

Setting the `PORT` environment variable will override the default port `3000`.

The HTTP Server object is created, and is told to use the application instance created in `app.js`.

The `app` object is next passed to `http.createServer()`.

The Node.js documentation tells us this function takes a `requestListener`, which is simply a function that takes the `request` and `response` objects we've seen previously.

The `app` object is such a function.

The `www` script starts the server listening on port we specified.

Try running the following command

```$
PORT=4242 DEBUG=fibonacci:* npm start
```

The application now listens on port `4242`.

## More details about our Express application

This tells Express to look for templates in the `views` directory and to use the Handlebars templating engine.

```js
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
```

`app.set` function is used for setting application properties.

Note: http://expressjs.com/en/4x/api.html to view api

Next is a series of `app.use` calls:

```js
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
```

The `app.use` function mounts middleware features/functions.

The middleware features/functions are executed during the processing of routes.

The features that are enabled in `app.js` are the following:

- Logging - `morgan` - https://www.npmjs.com/package/morgan

- HTTP Request Body Parsing - `body-parser` - https://www.npmjs.com/package/body-parser

- Cookie Parsing - `cookie-parser` - https://www.npmjs.com/package/cookie-parser

- Static File Web Server - Configured to serve assets from `public` directory

- Router Modules - `routes` and `users` - setup function handlers for matching URLS.
