# README
---

## Running Locally

### Prerequisties:

* [Node.js 5 or above](http://nodejs.org) (with npm)

### Instructions

1. `npm install`
1. `npm start`
1. Go to [localhost:3000](http://localhost:3000)


## Build Instructions

1. `npm run build`
1. The site will be generated in the `build` directory.


## Add New Blog

Just write a new markdown in `src/blog` and it will automatically generate the pages. Then you have to **reload your browser** to see the changes.


## Add New Downloads

Edit `src/versions.json` and append your new versions of downloads and switch `stable` or `latest` to your new version number. Then reload your browser to see the changes.


## Update Google Analytics

The GA script is in [templates/partials/ga.hbs](templates/partials/ga.hbs) and the `UA` is defined in [src/config.json](src/config.json).
