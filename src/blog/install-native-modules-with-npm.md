---
title: Install native modules for NW.js with npm
date: 2016/11/08
---
# {{{title}}}
{{{date}}}

I'm here to introduce a way to install native modules for NW.js directly with npm. You won't need to rebuild each native modules one-by-one after npm install any more, which will significantly save your time on native modules.

Following instructions work for all platforms and all releases (LTS and non-LTS) of NW.js:

```bash
# Install nw-gyp globally
npm install -g nw-gyp
# Setup target NW.js version
export npm_config_target=0.18.5
# Setup build architecture, ia32 or x64
export npm_config_arch=x64
export npm_config_target_arch=x64
# Setup env for modules built with node-pre-gyp
export npm_config_runtime=node-webkit
export npm_config_build_from_source=true
# Setup nw-gyp as node-gyp
export npm_config_node_gyp=$(which nw-gyp)
# Run npm install
npm install
```

Issues on Windows: `npm_config_node_gyp` must be set to `path\to\global\node_modules\nw-gyp\bin\nw-gyp.js` instead of its batch script `nw-gyp.cmd`. This should be [a bug of npm](https://github.com/npm/npm/issues/14543).

More detailed guides for [using native modules with NW.js](http://docs.nwjs.io/en/latest/For%20Users/Advanced/Use%20Native%20Node%20Modules/) are available on the official documentation site.
