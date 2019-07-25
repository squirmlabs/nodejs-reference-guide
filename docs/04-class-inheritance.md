Classes

Once a class is defined we can export it with either `module.exports.Classname` or `export class Classname`
New instances of a class are created with `new`.
You access a getter or setter function as if it is a simple field on the object. 
Behind the scenes, the getter and setter functions are invoked.

```js
export class Song {
  constructor(key, title, body) {
    this._key = key;
    this._title = title;
    this._body = body;
  }
  get key() {
    return this._key;
  }
  get title() {
    return this._title;
  }
  set title(newTitle) {
    return (this._title = newTitle);
  }
  get body() {
    return this._body;
  }
  set body(newbody) {
    return (this._body = newbody);
  }
}
```

The preceding implementation is not the best practiced example. Since, the `_title` and `_body` fields are publically visible, this means there is no data encapsulation. 


Test if the object is of a certain class

```js
if (anotherSong instanceof Song) {
    // ... it's a Song so act on it as a Song
}
```

Declare a sublass using the `extends` operator.

```js
class LoveSong extends Song {
  constructor(key, title, body, heart) {
    super(key, title, body);
    this._heart = heart;
  }
  get heart() {
    return this._heart;
  }
  set heart(newheart) {
    return (this._heart = newheart);
  }
}
```

`LoveNote` has all the fields of a Note, plus this new field named `heart`.

