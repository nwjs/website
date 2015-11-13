---
layout: quickstart
---

## Quick Start

Create `index.html`:

{% highlight html %}
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
{% endhighlight %}

Create `package.json`:

{% highlight json %}
{
	"name": "nw-demo",
	"main": "index.html"
}
{% endhighlight %}

Run:  
{% highlight bash %}
$ /path/to/nw .  (suppose the current directory contains 'package.json')
{% endhighlight %}

Note: on Windows, you can drag the folder containing `package.json` to `nw.exe` to open it.

Note: on OSX, the executable binary is in a hidden directory within the .app file. To run node-webkit on OSX, type:

{% highlight bash %}
$ /path/to/node-webkit.app/Contents/MacOS/node-webkit .  (suppose the current directory contains 'package.json')
{% endhighlight %}