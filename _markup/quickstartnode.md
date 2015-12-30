If you have Node.JS installed, set up a package.json file like this:

```json
{
    "name": "your_application_name",
    "main": "index.html",
    "devDependencies": { "nw": "^0.12.3" },
    "scripts": { "start": "nw ." }
}
```

Create an `index.html` file, here's a sample one:

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Hello World!</title>
  </head>
  <body>
    <h1>Hello World!</h1>
    We are using node.js <script>document.write(process.version)</script>.
  </body>
</html>
```

Then just run:

1. `npm install`
2. `npm start`

And it will automatically launch NW.js and open your `index.html` file that is located next to your `package.json` file.

* * *

For a more fleshed out version of an NW.js `package.json` file, see this example from [UGUI](http://UGUI.io) (an NW.js framework):

* [UGUI package.json](http://ugui.io/package)
