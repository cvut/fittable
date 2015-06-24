![fittable widget](http://i.imgur.com/8arGA7B.png)

[![Travis](https://img.shields.io/travis/cvut/fittable-widget/master.svg?style=flat-square)](https://travis-ci.org/cvut/fittable-widget)
![David](https://img.shields.io/david/cvut/fittable-widget.svg?style=flat-square)

**Fittable widget** is lightweight JavaScript widget used for displaying timetables and calendars for various applications. Offers subtle, flat and intuitive user interface. And it should be **more fittable** than any other timetable widget :blush:

Using JavaScript ES6+ code (converting to ES5 using [babel](https://github.com/babel/babel)) makes the widget ready for new technologies and development trends in+ JavaScript language.

Offers quick implementation into another applications through simple Javascript API layer. For more information how to use this widget, visit [our wiki](https://github.com/cvut/fittable-widget/wiki).

## Installation

### npm

First, make sure you're equipped with [Node.JS](http://www.nodejs.org) and [npm](http://www.npmjs.com).

The widget *will be* published to npm. All you need to do is running this command:

```
$ npm install fittable-widget
```

### from source code

Alternatively you can clone this repository and build it by yourself. For that you'll need to have Grunt CLI installed.

Running this command will build fittable widget into dist/ folder.

```
$ grunt build
```

## Screenshot
[![fittable screenshot](http://i.imgur.com/CTv21ks.png)](http://i.imgur.com/CTv21ks.png)

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
