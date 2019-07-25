Template strings are delimited with the backtick character that's also known as the grave accent.

```js
`template string text`;
```

Before ES2015, one way to implement a multiline string was this construct.

```js
[
  "<html><head><title>Welcome to Basstap Records!</title></head>",
  "<body><h1>Welcome to Basstap Records!</h1>",
  "<p><a href='/osinfo'>Info</a></p>",
  "</body></html>"
].join("\n");
```

With ES2015

```js
`<html><head>
<title>Welcome to Basstap Records!</title>
</head>
<body>
<h1>Welcome to Basstap Records!</h1>
<p><a href='/osinfo'>OS Info</a></p>
</body></html>`;
```

The real purpose of the template strings feature is supporting strings where we can easily substitute values directly into the string.

Before ES2015, a programmer could have written the code like this.

```js
["<tr><th>OS Type</th><td>{ostype} {osplat} {osarch} {osrelease}</td><tr>"]
  .join("\n")
  .replace("{ostype}", os.type())
  .replace("{osplat}", os.platform())
  .replace("{osarch}", os.arch())
  .replace("{osrelease}", os.release());
```

With template strings this can be written as follows:

```js
`<tr><th>OS Type</th><td>${os.type()} ${os.plat()} ${os.arch()} ${os.release()}</td><tr>`;
```
`${..}` brackets are interpreted as an expression. 

The expression can be a simple mathematical expression, a variable reference, or function call.

Indentation for the text content is flush with column zero.

Note: Be aware of code readability. Adding blanks will become part of the string and will be output in the HTML.

Note: The above approach also carries a security risk. Have you verified the data is safe? That it will not form the basis of a security attack? What about user-supplied content, and the risk that nefarious user might supply insecure content implanting some kind of malware into target computers?

For this and many other reasons, it is often safer to use an external template engine. Applications like Express make it easy to do so.
