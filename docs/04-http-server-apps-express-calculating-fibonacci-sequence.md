## Calculating the Fibonacci sequence with an Express application

The Fibonacci numbers are the interger sequence: `0,1,1,2,3,5,8,13,21,24`

Each entry in the list is the sum of the previous two entries in the list. Invented by Leonardo of Pisa, AKA Fibonacci. 

One method we can use to calculate entries in the Fibonacci sequence is the recursive algorithm.

In `app.js`, we make the following changes to the top portion of the file:

```js
const express = require('express');
const hbs = require('hbs');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const index = require('./routes/index');
const fibonacci = require('./routes/fibonacci');
const app = express();
const createError = require('http-errors');


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// Explicitly imported hbs module for extra configuration
hbs.registerPartials(path.join(__dirname, 'partials'));

// uncomment after placing favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico)));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false }));
app.use(cookieParser());

// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/fibonacci', fibonacci);
```

The `fibonacci` module serves to query a number for which we'll calculate the Fibonacci number.

## math.js

Contains simplistic Fibonacci implementation:
```js
exports.fibonacci = function(n) {
  if (n === 0) return 0;
  else if (n === 1 || n === 2) return 1;
  else return exports.fibonacci(n - 1) + exports.fibonacci(n - 2);
};
```
## Views index.hbs

Serves as the front page of our application.

This will be inserted in place of the `{{{body}}}` in `layout.hbs`.

The `{{> navbar}}` marker, refers to a partial named `navbar`. 
```hbs
<h1>{{title}}</h1>
{{> navbar}}
```

## Partials - navbar.html

Will serve as a navigation bar that's included on every page.

```html
<div class='navbar'>
  <p><a href='/'>home</a> | <a href='/fibonacci'>Fibonacci's</a></p>
</div>
```

## Views - fibonacci.hbs

```hbs
<h1>{{title}}</h1>
{{> navbar}}
{{#if fiboval}}
<p>Fibonacci for {{fibonum}} is {{fiboval}}</p>
<hr />
{{/if}}
<p>Ender a number to see it's Fibonacci number</p>
<form name='fibonacci' action='/fibonacci' method='get'>
  <input type='text' name='fibonum' />
  <input type='submit' value='Submit' />
</form>
```

Files in `views` are templates into which data is rendered. They serve the View aspect of the `Model-View-Controller` paradigm.

## Routes - users.js

Delete `routes/users.js`.

## Routes - index.js

In `routes/index.js` change the fouter function to the following:

```js
const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Fibonacci' });
});

module.exports = router;

```

This anonymous object passed to `res.render` contains the data values we provide to the layout and view templates.


## Routes - fibonacci.js

```js
const express = require('express');
const router = express.Router();

const math = require('../math');

router.get('/', function(req, res, next) {
  if (req.query.fibonum) {
    res.render('fibonacci', {
      title: 'Calculate Fibonacci numbers',
      fibonum: req.query.fibonum,
      fiboval: math.fibonacci(req.query.fibonum)
    });
  } else {
    res.render('fibonacci', {
      title: 'Calculate Fibonacci numbers',
      fiboval: undefined
    });
  }
});

module.exports = router;
```

There are two routes in `app.js` .

`/` is handled by `routes/index.js`
`/fibonacci` is handled by `routes/fibonacci.js`


The `res.render` function renders the name template using the provided data values and emits the result as an HTTP response.

The `views/fibonacci.hbs` template contains a form in which the user enters a number.
Because it is a `GET` form, when the user clicks on the Submit button, the browser will issue an HTTP `GET` on the `/fibonacci` URL.

What distinquishes one `GET` on `/fibonacci` from another is whether the URL contains a query parameter named `fibonum`.

When the user first enters the route `/fibonacci`, there is no `fibonum`, nothing to calculate.

After the user has entered a number and clicked on the Submit, there is a `fibonum` and something to calculate.

Express automatically parses the query parameters, making them available as `req.query`. 

`routes/fibonacci.js` can check whether there is a `fibonum`. If there is, it calls the `fibonacci` function to calculate the value.

