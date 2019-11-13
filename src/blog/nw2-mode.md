---
title: NW2, Another Key Step of NW.js
date: 2019/11/13
---
# {{{title}}}
{{{date}}}

The new browser window implementation for NW.js, which is called "NW NewWin" internally, a.k.a "NW2", is an important refactoring I've been working on. The NW.js application's GUI window implementation and various internal webpage handling around it has been migrated from Chrome App's codebase to the Chrome browser's codebase.

This work will be the foundation of more major features (tab support, find in page etc), fixing [important issues](https://github.com/nwjs/nw.js/issues/4418) and better software quality. It's one of the most exciting changes since the 0.13 release. It's also found with issue fixed and better performance in user's testing.

In theory, your application should just work in the same way without any issues as it's a pure internal change. It got the first release in 0.35.4 earlier in this year under `--enable-features=nw2` switch. The switch will become the default soon in the upcoming 0.42.4 release. Thanks to all the community members who helped testing and contributing to it in [the tracking issue](https://github.com/nwjs/nw.js/issues/5875), including @Blatman, @TheRealDannyyy, @elpeleq42, @Yonezpt, @jtg-gg and many others.

After the release, if you find anything unusual in your application, try the `--disable-features=nw2` switch first and file an issue on GitHub if your application works well with NW2 disabled. I'll keep the old NW1 mode maintained for several major versions and then start gradually removing code for it. Eventually the NW1 mode will not be supported and NW2 will be mandatory.

Cheers,  
Roger Wang, NW.js creator and maintainer

[Join the discussion in the mailing list on this topic](https://groups.google.com/d/msg/nwjs-general/1YMHN3m1rtI/f3gF-Jl3AgAJ)