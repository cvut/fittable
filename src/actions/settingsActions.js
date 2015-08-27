import { SETTINGS_CHANGE } from '../constants/actionTypes'

export function changeSettings (payload) {
  return {
    type: SETTINGS_CHANGE,
    settings: payload,
  }
}

export const setLocale = (newLocale) => changeSettings({locale: newLocale})
export const setLayout = (layout) => changeSettings({layout: layout})
export const setEventsColors = (enabled) => changeSettings({eventsColors: enabled})
export const setFullWeek = (enabled) => changeSettings({fullWeek: enabled})
export const setFacultyGrid = (enabled) => changeSettings({facultyGrid: enabled})
