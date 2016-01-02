# README
---

## Build Website in Local

You need **Node.js 5.x** with `npm` and `bower` to build this website.

Run:

```bash
npm install
bower install
npm run serve
```

Then open http://localhost:3000/ with your browser.

If you just want to build the website, run

```bash
npm run build
```

And you will get generated website in `build` directory.

## Add New Blog

Just write a new markdown in `src/blog` and it will automatically generate the pages. Then you have to **reload your browser** to see the changes.

## Add New Downloads

Edit `src/versions.json` and append your new versions of downloads and switch `stable` or `latest` to your new version number. Then reload your browser to see the changes.

## Update Google Analytics

The GA script is in [templates/partials/ga.hbs](templates/partials/ga.hbs) and the `UA` is defined in [src/config.json](src/config.json).
