---
title: Headless Support and Next Steps
date: 2025/06/30
---
# {{{title}}}
{{{date}}}

I'm pleased to announce that NW.js supports headless mode now. To use it, put `--headless` in the command line arguments.

See the original discussion on this feature: https://github.com/nwjs/nw.js/issues/769 . If you find any problems, please let me know by filing a new issue.

This functionality was implemented to support running NW.js in environments without a graphical interface, which opens it up for server-side tasks.

This new capability puts NW.js in a similar category as other browser automation tools. The key differentiator for our project remains the direct integration of the Node.js context with the DOM, which could be a significant technical advantage for certain applications.

To guide future development efforts, I am seeking input from the community on what to prioritize next for headless and command-line usage.

One initial proposal under consideration is to redirect the browser process stdin/stdout to the web engine's JavaScript context. This would allow an NW.js application to be used in shell pipelines and behave more like a standard command-line executable, which could be useful for scripting and automation. It will enable the redirecting stdin/stdout in the Chromium browser process to the Node.js residing in the Web engine so using it will feel more like using Node.js from terminal. plus you can call all the nw.* and DOM APIs from there.

This is just one potential direction. I am interested in collecting other ideas and understanding your requirements.

- What specific use cases do you have for running NW.js in a headless environment?
- Are there technical blockers or missing features that currently prevent you from using it for automation or server-side tasks?
- What APIs or tooling would be most beneficial for your projects?

Please share your thoughts and proposals on [this thread](https://groups.google.com/g/nwjs-general/c/dEVg7vmtvlg/m/6iFOtgB7AgAJ). Your feedback will be valuable for planning the project's roadmap.

Best regards,  
Roger Wang
