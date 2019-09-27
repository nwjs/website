---
title: nw-gyp updated to 3.6.5 with Clang support
date: 2019/09/27
---
# {{{title}}}
{{{date}}}

nw-gyp is updated to 3.6.5 to include clang compiler on windows. Clang will be used as the default compiler and linker when native modules are built on windows platform. It can be turned off and switch back to MSVC with '--clang=false' or '--no-clang'.

NW has been built with clang on windows since 0.39 following upstream. So does the Node.js component inside NW. The change to nw-gyp is needed in most cases, or you'll hit errors like those reported in https://github.com/nwjs/nw.js/issues/7104

Please join the discussion on this topic in the mailing list: https://groups.google.com/d/msg/nwjs-general/9kNhfZvDYLU/fzloAABHBQAJ

Best regards,
Roger Wang

