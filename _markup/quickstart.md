Create `index.html`:

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

Create `package.json`:

```json
{
  "name": "nw-demo",
  "main": "index.html"
}
```

Run:  
```bash
$ /path/to/nw .  (suppose the current directory contains 'package.json')
```

**Note:** On Windows, you can drag the folder containing `package.json` to `nw.exe` to open it.

**Note:** On OSX, the executable binary is in a hidden directory within the .app file. To run NW.js on OSX, type:
```bash
$ /path/to/nwjs.app/Contents/MacOS/nwjs .  (suppose the current directory contains 'package.json')
```

* * *

For a more fleshed out version of an NW.js `package.json` file, see this example from [UGUI](http://UGUI.io) (an NW.js framework):

* [UGUI package.json](http://ugui.io/package)
