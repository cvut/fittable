![fittable](http://i.imgur.com/tJuZ7l3.png)

[![Travis](https://img.shields.io/travis/cvut/fittable/master.svg?style=flat-square)](https://travis-ci.org/cvut/fittable)
[![AppVeyor](https://img.shields.io/appveyor/ci/cvut/fittable.svg?style=flat-square)](https://ci.appveyor.com/project/cvut/fittable)
[![David](https://img.shields.io/david/cvut/fittable.svg?style=flat-square)](https://david-dm.org/cvut/fittable)

Fittable is new timetable application developed at [FIT CTU in Prague](http://fit.cvut.cz).
It’s a client-side JavaScript application built on top of the [Sirius API](https://github.com/cvut/sirius), created with an emphasis on modern approach to design and used technology.

Using JavaScript ES6+ code (converting to ES5 using [babel](https://github.com/babel/babel)) makes fittable ready for new technologies and development trends in JavaScript language.


## Installation

### Requirements

You will need [Node.JS](http://www.nodejs.org) or [io.js](https://iojs.org/).

You need [npm](http://www.npmjs.com) **version 2.11** or newer for package scopes support. You can verify this by running:

```
npm --version
```

You can update npm by running:

```
npm install npm -g
```

### Installing dependencies

To install dependencies, just run:

```
npm install
```

### Building

We use npm scripts to execute common build tasks. Project uses [Webpack](https://webpack.github.io/) under the hood for JS and CSS bundling.

Run the main `build` task with:

```
npm run build
```

This will build full and minified source code, transpiles JS files and copy HTML and image assets.

The resulting build is located in `dist/` directory:

- `fittable.js` and `fittable.min.js` respectively are bundles for usage in web browsers,
- `js` directory contains transpiled code to ES5 for use in other projects,
- `index.html` is an example project with mock-up data.

Alternatively you can use the following tasks individually:

- `npm run build:full` – generates non-minified CSS and JS files
- `npm run build:min` – generates minified CSS and JS files
- `npm run build:npm` – transpiles ES6 source files to ES5 with [Babel](https://babeljs.io/) for consumption by other CommonJS packages,
- `npm run build:assets` – copies HTML and image files to `dist/` directory

### Development server

Run `npm start` to launch [webpack-dev-server](https://webpack.github.io/docs/webpack-dev-server.html) with hot reloading.

You can access the running server on http://localhost:8080/

Visit http://localhost:8080/webpack-dev-server/ to have the page automatically reloaded on source code change.

## Screenshot

[![fittable screenshot](http://i.imgur.com/CTv21ks.png)](http://i.imgur.com/CTv21ks.png)
