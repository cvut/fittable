/* eslint-disable */
import { fmoment } from '../date'

var dataCallback = function(params, callback) {
  const {calendarType, calendarId, dateFrom: from, dateTo: to} = params

  setTimeout(function(from, to) {
    var data = [];
    var linknames = {
      teachers: [{
        id: 'novacjo4',
        name: {
          cs: 'Josef Novák',
          en: 'Josef Novák'
        }
      }, {
        id: 'novacjin',
        name: {
          cs: 'Jindřich Novák',
          en: 'Jindřich Novák'
        }
      }, {
        id: 'skocdopo',
        name: {
          cs: 'Ing. Alexandra Skočdopolová, Ph.D.',
          en: 'Ing. Alexandra Skočdopolová, Ph.D.'
        }
      }],
      courses: []
    };

    // Create 12 events...
    for (var i = 0; i < 33; i++) {
      var date = new Date(from);
      var dayrel = Math.random() * 7,
        hourstart = Math.random() * 11 + 8,
        len = Math.random() + 2;
      var startDate = new Date(date);
      startDate.setDate(date.getDate() + dayrel);
      startDate.setHours(hourstart);
      startDate.setMinutes(0);
      startDate.setSeconds(0);
      var endDate = new Date(date);
      endDate.setDate(date.getDate() + dayrel);
      endDate.setHours(hourstart + len);
      endDate.setMinutes(0);
      endDate.setSeconds(0);
      var replaceDate = new Date(startDate);
      replaceDate.setMonth(startDate.getDate() + Math.floor(Math.random() * 10));

      var randomDescs = [
        "Nunquam experientia buxum. Pol, a bene fermium.",
        "When one follows mind and meditation, one is able to witness density.",
        "Peanuts combines greatly with nutty truffels. Bitter, salted pudding is best blended with aromatic bourbon.",
        "Arrr, never fight a jack. Wow, fine cannon. you won't drink the fortress.",
        "Fantastic collision courses lead to the nuclear flux. View wihtout sonic shower, and we won’t dissolve a kahless.",
        "Nunquam imperium silva. Boreass sunt valebats de primus abactus. Voxs unda, tanquam camerarius tabes.",
        "This one is extra long. Nunquam imperium silva. Boreass sunt valebats de primus abactus. Voxs unda, tanquam camerarius tabes. Fantastic collision courses lead to the nuclear flux. View wihtout sonic shower, and we won’t dissolve a kahless. Peanuts combines greatly with nutty truffels. Bitter, salted pudding is best blended with aromatic bourbon."
      ];

      var cancreplrandomness = Math.random();

      var types = ["laboratory", "tutorial", "lecture", "exam"];
      var coursename = "BI-" + Math.random().toString(36).substring(10).toUpperCase();

      // And add new event to array
      data[i] = {
        id: Math.floor(Math.random() * (9999 - 1000)) + 1000,
        name: null,
        course: coursename,
        note: "Placeholder event",
        startsAt: startDate.toISOString(),
        endsAt: endDate.toISOString(),
        sequenceNumber: Math.floor(Math.random() * 16),
        type: types[Math.round(Math.random() * (types.length - 1))],
        room: "T9:303",
        teachers: ["novacjo4", "novacjin", "skocdopo"],
        flag: null,
        notification: false,
        cancelled: cancreplrandomness > 0.8,
        replacement: cancreplrandomness < 0.1,
        details: {
          students: [{
            id: 1
          }, {
            id: 11
          }, {
            id: 111
          }, {
            id: 1111
          }, {
            id: 11111
          }],
          capacity: 140,
          parallel: "201",
          description: randomDescs[Math.round(Math.random() * (randomDescs.length - 1))],
          appliedExceptions: []
        }
      };

      // Add link name to course
      linknames.courses.push({
        id: coursename,
        name: {
          cs: 'Český celý název ' + coursename,
          en: 'English full name of ' + coursename
        }
      });

      if (data[i].cancelled) {
        data[i].replacedBy = {
          eventId: Math.floor(Math.random() * (9999 - 1000)) + 1000,
          startsAt: replaceDate.toISOString()
        };

        data[i].details.appliedExceptions = [{
          id: 0,
          type: 'CANCEL',
          name: 'Exception name'
        }];
      }

      if (data[i].replacement) {
        data[i].replaces = startDate.toISOString();
      }
    }

    if (window.ERROR) {
      var e = new Error('Faux error given from window')
      e.type = window.ERROR
      callback(e)
    } else {
      var result = {
        events: data,
        linkNames: linknames
      }
      callback(null, result)
    }

  }.bind(this, from, to), Math.random() * 1000);
};

var semesterDataCallback = function(callback) {

  setTimeout(function() {

    callback([{
      id: "18000-B142",
      semester: "B142",
      faculty: 18000,
      startsOn: fmoment('2015-02-16'),
      endsOn: fmoment('2015-09-21'),
      hourDuration: 45,
      breakDuration: 15,
      dayStartsAtHour: 7.5,
      dayEndsAtHour: 21.25,
      periods: [
        {
          type: 'teaching',
          startsOn: fmoment('2015-02-16'),
          endsOn: fmoment('2015-05-17'),
        },
        {
          type: 'exams',
          startsOn: fmoment('2015-05-18'),
          endsOn: fmoment('2015-06-27')
        },
      ],
    }, {
      id: "18000-B151",
      semester: "B151",
      faculty: 18000,
      startsOn: fmoment('2015-10-05'),
      endsOn: fmoment('2016-02-21'),
      hourDuration: 45,
      breakDuration: 15,
      dayStartsAtHour: 7.5,
      dayEndsAtHour: 21.25,
      periods: [
        {
          type: 'teaching',
          startsOn: fmoment('2015-10-05'),
          endsOn: fmoment('2015-12-22'),
        },
        {
          type: 'exams',
          startsOn: fmoment('2016-01-04'),
          endsOn: fmoment('2016-02-21')
        },
      ],
    }]);

  }, Math.random() * 2000);

};

var searchCallback = function(query, callback) {

  setTimeout(function() {

    callback([{
      id: Math.random().toString(36).substring(10).toUpperCase() + query,
      title: 'Blah blah ' + query,
      type: 'course'
    }, {
      id: Math.random().toString(36).substring(10).toUpperCase() + query,
      title: 'Hodge-podge',
      type: 'room'
    }, {
      id: Math.random().toString(36).substring(10).toUpperCase() + query,
      title: 'Flim flam',
      type: 'person'
    }]);

  }, Math.random() * 2000);

};

function viewChangeCallback (view, id) {
  console.log('viewChangeCallback fired', view, id)
}

function dateChangeCallback (newdate, semester) {
 /* ... */
}

function fetchUser (cb) {
  cb(null, { id: 'novacjos', name: 'Josef Nováček, MBA', publicAccessToken: 'asdasdasd1234' })
}

export {
    searchCallback as search,
    dataCallback as data,
    semesterDataCallback as semesterData,
    dateChangeCallback as dateChange,
    viewChangeCallback as viewChange,
    fetchUser,
    logoutUser,
}
