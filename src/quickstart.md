---
title: Quick Start
---

## {{{title}}}

**Step 0:** Download NW.js from [here](/).

**Step 1:** Create `package.json`:

```json
{
  "name": "nw-demo",
  "main": "index.html"
}
```

**Step 2:** Create `index.html`:

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Hello World!</title>
  </head>
  <body>
    <h1>Hello World!</h1>
    We are using Node.js <script>document.write(process.version)</script>.
  </body>
</html>
```

**Step 3:** Run your app

```bash
$ cd /path/to/nw-demo # change to the project directory
$ /path/to/nw .
```

_Note:_ On Mac, use `/path/to/nwjs.app/Contents/MacOS/nwjs` for `/path/to/nw`.

## Further Readings

* [Official Documentation for NW.js]({{{config.links.docs}}})
* Books for NW.js
    - [NW.js In Action](https://www.manning.com/books/nw-js-in-action) by Paul B. Jensen (_not published_)

## Questions and Bugs

* Discuss in [Mailing list]({{{config.links.mailing_list}}})
* Chat in [Gitter]({{{config.links.gitter}}})
* Report bugs on [Github]({{{config.links.github}}}/issues)
