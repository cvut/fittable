import R from 'ramda'


/**
 * Finds all overlayed events and returns updated events array with appear property
 * @param props Props
 * @returns {*} Updated events
 */
export function findOverlayedEvents (props) {

  function cmpByStart (lhs, rhs) {
    if (lhs.startsAt < rhs.startsAt) {
      return -1
    } else if (lhs.startsAt > rhs.startsAt) {
      return 1
    } else {
      return 0
    }
  }

  var overlayed = []
  var lastend = new Moment(0)
  var events = props.events.sort(cmpByStart)

  // Compares this event's start with the last end. If the start is after the last end,
  // set appropriate appearances for all events in queue.
  for (var evid in events) {

    var start = new Moment(events[evid].startsAt)

    // Compare
    if (start.isAfter(lastend) || start.isSame(lastend)) {
      let appearance = appearanceClass(overlayed.length)
      events = applyAppearance(events, overlayed, appearance)
      overlayed = []
    }

    // Queue the event
    overlayed.push(evid)

    // Set event's end as last end
    if (new Moment(events[evid].endsAt).isAfter(lastend)) {
      lastend = new Moment(events[evid].endsAt)
    }
  }
  // FIXME: DUPLICATION!
  // Set appearance for the last events
  let appearance = appearanceClass(overlayed.length)
  return applyAppearance(events, overlayed, appearance)
}

/*


 function appearanceClass (overlaysLength) {

 if (overlaysLength >= 4) {
 return 'quarter'
 }
 if (overlaysLength === 3) {
 return 'third'
 }
 if (overlaysLength === 2) {
 return 'half'
 }

 return 'regular'
 }

 /**
 * Applies appearance for array of overlayed events
 * @param events Events array
 * @param overlayed Overlayed events
 * @param appearanceClass Appearance class to be set
 * @returns {*}

function applyAppearance (events, overlayed, appearanceClass) {
  for (var oid in overlayed) {
    events[overlayed[oid]].appear = appearanceClass

    if ((overlayed.length >= 4 && oid % 4 == 0) || (overlayed.length > 1 && oid % overlayed.length == 0)) {
      events[overlayed[oid]].appear += '-first'
    }
  }
  return events
}
 */
