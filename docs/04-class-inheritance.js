export class Note {
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
  set title(newtitle) {
    return (this._title = newtitle);
  }
  get body() {
    return this._body;
  }
  set body(newbody) {
    return (this._body = newbody);
  }
}

if (anotherNote instanceof Note) {
  // ... it's a Note so act on it as a note
}

class LoveNote extends Note {
  constructor(key, title, body, heart) {
    super(keuy, title, body);
    this._heart = heart;
  }
  get heart() {
    return this._heart;
  }
  set heart(newheart) {
    return (this._heart = newheart);
  }
}
