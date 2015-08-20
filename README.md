![fittable widget](http://i.imgur.com/8arGA7B.png)

[![Travis](https://img.shields.io/travis/cvut/fittable-widget/master.svg?style=flat-square)](https://travis-ci.org/cvut/fittable-widget)
[![David](https://img.shields.io/david/cvut/fittable-widget.svg?style=flat-square)](https://david-dm.org/cvut/fittable-widget)

**Fittable widget** is lightweight JavaScript widget used for displaying timetables and calendars for various applications. Offers subtle, flat and intuitive user interface. And it should be **more fittable** than any other timetable widget :blush:

Using JavaScript ES6+ code (converting to ES5 using [babel](https://github.com/babel/babel)) makes the widget ready for new technologies and development trends in+ JavaScript language.

Offers quick implementation into another applications through simple Javascript API layer. For more information how to use this widget, visit [our wiki](https://github.com/cvut/fittable-widget/wiki).

## Installation

### Requirements

You will need [Node.JS](http://www.nodejs.org) or [io.js](https://iojs.org/).

You need [npm](http://www.npmjs.com) **version 2.11** or newer for package scopes support. You can verify this by running

```
npm --version
```

You can update npm by running

```
npm install npm -g
```

### Downloading from npm

The widget is currently published in the [CTU’s npm registry](https://repository.fit.cvut.cz/npm).
This registry is publicly accessible, so you only need to associate it with the `@cvut` scope:

```
npm config set @cvut:registry https://repository.fit.cvut.cz/npm
```

Then you can install the widget:

```
npm install @cvut/fittable-widget
```

### Building from source code

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

## Quick start

After a successful installation of the widget, include **fittable.min.js** from the dist folder into your project.

```html
<script type="text/javascript" src="fittable.min.js"></script>
```

Configure the widget and initialize it.

```javascript
var options = {
    callbacks: {
        search: mySearchCallback,
        data: myDataCallback,
        dateChange: myDateChangeCallback
    },
    locale: 'en'
};

var fittable = fittable( 'fittable', options );
```

This is basic configuration needed for running the widget. The next important step is to correctly implement the callbacks. For more information visit [our wiki](https://github.com/cvut/fittable-widget/wiki).

## Screenshot
[![fittable screenshot](http://i.imgur.com/CTv21ks.png)](http://i.imgur.com/CTv21ks.png)
