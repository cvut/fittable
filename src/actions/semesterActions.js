import { SEMESTER_LOAD_COMPLETED } from '../constants/actionTypes'
import { findSemester, convertRawSemester, dateInSemester } from '../semester'

function receiveSemesterData (semester) {
  return {
    type: SEMESTER_LOAD_COMPLETED,
    payload: semester,
  }
}

export function fetchSemesterData (semesterCallback, date) {
  return function semesterDataThunk (dispatch, getState) {
    const {semester} = getState()
    if (semester && dateInSemester(semester, date)) {
      return
    }

    semesterCallback(data => {
      if (!data) {
        return
      }

      const currentSemester = findSemester(data, date)
      if (!currentSemester) {
        return
      }

      dispatch(receiveSemesterData(convertRawSemester(currentSemester)))
    })
  }
}
