# Client-side API

Fittable exposes some functionality for integration with native applications or client-side extensions. All methods are available in `window.fittable`.

## changeDate

```js
changeDate(date: Date | string): void
```

Changes displayed date to a new date. A date can be a Date object or date string in ISO format, e.g. `2017-03-30`


### Example

```js
// Set date to January 30th, 2017
window.fittable.changeDate('2017-01-30')

// Set date to today's date
window.fittable.changeDate(new Date())
```

## getCurrentDate

```js
getCurrentDate(): Date
```

Returns currently displayed date as Date object.

### Example

```js
var d = window.fittable.getCurrentDate()
console.log(d)
// Prints:
// Mon Mar 27 2017 02:00:00 GMT+0200 (CEST)
```

## getCurrentDateStr

```js
getCurrentDateStr(): string
```

Returns currently displayed date as Date object.

### Example

```js
var s = window.fittable.getCurrentDateStr()
console.log(s)
// Prints:
// 2017-03-27
```
