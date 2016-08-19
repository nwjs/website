---
title: NW.js will continue supporting Chrome Apps
date: 2016/08/20
---
# {{{title}}}
{{{date}}}

Today our upstream made an [announcement](http://blog.chromium.org/2016/08/from-chrome-apps-to-web.html) about their plan on Chrome Apps, in which Chrome Apps will not be supported on Win, Linux and macOS.

NW.js can run Chrome Apps directly and we'll continue supporting it. Chrome App developers can redistribute their application after packaging with NW.

[Staring from version 0.13](/blog/whats-new-in-0.13), NW.js brings most features in the Chromium browser, including Chrome Apps support, chrome.* platform APIs. We support all `chrome.*` API in the [Chrome App platform](https://developer.chrome.com/apps/api_index). In addition, we support some chrome.* API in the [Extension Platform](https://developer.chrome.com/extensions/api_index). 

Chrome Apps can be run directly on NW. Clone the [sample apps repository](https://github.com/GoogleChrome/chrome-app-samples) and run one of them with:

```bash
$ /path/to/nw.exe <folder path of the manifest.json file>
```

or drag the folder to the NW executable. And of course Node.js APIs can be accessed from Chrome App: add “node” permission to manifest.json and you are ready to call nw.require().

For more information, see [What's new in 0.13](/blog/whats-new-in-0.13)

See our mailing list to discuss on this post: https://groups.google.com/d/msg/nwjs-general/UYqoXHFMMag/-UPXaFMABAAJ