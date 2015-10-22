![fittable](http://i.imgur.com/tJuZ7l3.png)

[![Travis](https://img.shields.io/travis/cvut/fittable/master.svg?style=flat-square)](https://travis-ci.org/cvut/fittable)
[![AppVeyor](https://img.shields.io/appveyor/ci/cvut/fittable.svg?style=flat-square)](https://ci.appveyor.com/project/cvut/fittable)
[![David](https://img.shields.io/david/cvut/fittable.svg?style=flat-square)](https://david-dm.org/cvut/fittable)

Fittable is new timetable application developed at [FIT CTU in Prague](http://fit.cvut.cz).
It’s a client-side JavaScript application built on top of the [Sirius API](https://github.com/cvut/sirius), created with an emphasis on modern approach to design and used technology.

Using JavaScript ES6+ code (converting to ES5 using [babel](https://github.com/babel/babel)) makes fittable ready for new technologies and development trends in JavaScript language.

[![fittable screenshot](http://i.imgur.com/CTv21ks.png)](http://i.imgur.com/CTv21ks.png)

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

## Building

We use npm scripts to execute common build tasks. Project uses [Webpack](https://webpack.github.io/) under the hood for JS and CSS bundling.

Run the main `build` task with:

```
npm run build
```

This will build full and minified source code, transpiles JS files and copy HTML and image assets.

The resulting build is located in `dist/` directory:

- `fittable.js` is bundle for usage in web browsers (it can be minified depending on build command used),
- `js` directory contains transpiled code to ES5 for use in other projects,
- `index.html` is an example project with mock-up data.

Alternatively you can use the following tasks individually:

- `npm run build:dev` – generates non-minified CSS and JS files
- `npm run build:prod` – generates production (minified) CSS and JS files
- `npm run build:npm` – transpiles ES6 source files to ES5 with [Babel](https://babeljs.io/) for consumption by other CommonJS packages,
- `npm run build:assets` – copies HTML and image files to `dist/` directory

## Development

### Testing

We use [tape](https://github.com/substack/tape) for unit testing ([blue-tape](https://github.com/spion/blue-tape) respectively).

Tests are located in `src/test`.

You can run tests using `npm test` for plain [TAP output](https://testanything.org/), or `npm run test:spec` for nicer output. There is also an experimental command `npm run test:watch` to run tests continuously when files change.

### Development Server

Run `npm start` to launch [webpack-dev-server](https://webpack.github.io/docs/webpack-dev-server.html) with hot reloading.

You can access the running server on http://localhost:8080/

### Access Credentials

To access local development instance you need an access token for authentication with backend service ([Sirius](https://github.com/cvut/sirius)). The easiest way to get the token is copying `oauth_access_token` cookie after authorisation with [production instance](https://sirius.fit.cvut.cz/fittable-dev/).

Then add following to the `.env` file (or copy `.env.sample` in the repository):

```
OAUTH_ACCESS_TOKEN=<value of oauth_access_token cookie>
OAUTH_NICKNAME=<your username>
```

These variables will be passed as respective cookies by the [development server](#development-server).

See also [configuration](#configuration) below.

## Configuration

Application behaviour can be controlled via the following environment variables. You can set these variables permanently via `.env` file, through `export` in shell or directly when running npm commands. For example:

```
FITTABLE_SOURCE=sirius npm start
```

starts a [development server](#development-server) using Sirius as a data source.

Environment variables are inlined during build process using Webpack's [DefinePlugin](https://github.com/webpack/docs/wiki/list-of-plugins#defineplugin), e.g. in the example above, `process.env.NODE_ENV` gets replaced by `"production"` in the final bundle, resulting in conditions like `"production" === "production"` which can be further eliminated through minification.

### Configuration Variables

`NODE_ENV`: When set to `production`, React debug messages are removed and Redux logging is disabled.
Unset by default. Enabled for `npm run build:prod` (through `webpack.production.config.js` file).

`FITTABLE_SOURCE`: Controls which data backend is enabled. Set this to `sirius` to use actual data from Sirius (requires [access credentials](#access-credentials)).
By default, fake data source is used (called `faux`). Set to `sirius` for `npm run build:prod` (through `webpack.production.config.js` file).

`SIRIUS_TARGET`: Controls which instance of Sirius should be used for `sirius` data source
By default, `staging` instance is used. Can be set to `production` to use production instance, or alternatively the resulting URL can be overriden by global variable (see below). Note that this is currently **not set** by `npm run build:prod`, i.e. staging instance is used by default.

`OAUTH_ACCESS_TOKEN`: Used by [development server](#development-server) to set `oauth_access_token` cookie for Sirius authorisation. See [Access Credentials](#access-credentials).

`OAUTH_NICKNAME`: Used by [development server](#development-server) to set `oauth_nickname` cookie. It contains CTU username to load user's personal calendar from Sirius.

### Sirius Base URL Override

It is possible to directly override base URL for Sirius API without rebuilding whole bundle by adding JavaScript global variable `SIRIUS_BASE_URL` before bundle initialisation, for example by adding the following to the `index.html` file (into `<head>`):

```html
<script>
window.SIRIUS_BASE_URL = 'https://sirius.fit.cvut.cz/api/v1/'
</script>
```

This is useful for redeploying staging bundles to production.
