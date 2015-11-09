import {merge} from 'ramda'

const DEFAULT_PARAMS = {
  calendarId: 'MI-RUB',
  calendarType: 'courses',
  date: '2015-10-12',
}

export default function (params = {}) {
  const {calendarId, calendarType, date} = merge(DEFAULT_PARAMS, params)

  return {
    router: {
      params: {
        calendarId,
        calendarType,
      },
      location: {
        query: {
          date,
        },
      },
    },
  }
}
