import { SEMESTER_LOAD_COMPLETED } from '../constants/actionTypes'
import { findSemester, convertRawSemester } from '../semester'

function receiveSemesterData (semester) {
  return {
    type: SEMESTER_LOAD_COMPLETED,
    payload: { semester },
  }
}

export function fetchSemesterData (semesterCallback, date) {
  return function semesterDataThunk (dispatch) {
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
