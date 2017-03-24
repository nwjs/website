---
title: JavaScript Source Code Protection Performance Vastly Improved
date: 2017/03/24
---
# {{{title}}}
{{{date}}}

[Four years ago](https://github.com/nwjs/nw.js/issues/269#event-37337214) we released JavaScript Source Code protection feature in v0.4.2. It gives programmers capability to compile their source code to binary machine code so that their intellectual property could be protected in a better way. This follows one of the founding idea of the project - let JavaScript programmers do everything that C/C++ programmers can do. From the feedback, I can say that many users are using it happily although it suffers from a performance issue, that compiled binary code runs slower than JS source code (~30% according to v8bench).

Today, I'm excited to announce that the performance issue has been fixed: **compiled binary code now run as fast as JS source code without performance overhead**. This brings 3x-4x improvement according to our test:

![before-the-fix](/images/octane.png "Before the fix")
![after-the-fix](/images/octane-future.png "After the fix")

The fix has been released in [v0.22.0-beta1](v0.22.0-beta1/) under a flag. And it will be turned on by default in v0.23.0. To use it, pass `--future` when you compile the source code and start NW:
```bash
$ nwjc --future source.js compiled.bin
$ nw --js-flags="--future" .
```
[See more here](http://docs.nwjs.io/en/latest/For%20Users/Advanced/Protect%20JavaScript%20Source%20Code/) to learn how to use the source code protection feature.

[It has been exactly a year](whats-new-in-0.13/) after we released the 0.13 milestone. After that we executed well on keeping close updates with Chromium upstream. NW major version bumps within 1 day or even on the same day after every Chromium browser stable upgrade. We delivered many new features and optimizations in the web engine while keeps up the quality. I'm happy to write this blog post 1 year later and see what has been done. Moving forward, we expect to keep pace and please stay tuned for more exciting news.

## Discussion

See our mailing list to discuss on this article: https://groups.google.com/d/msg/nwjs-general/kmQ2zCuL838/1MceRe5mFQAJ