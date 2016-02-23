import React from 'react'
import CP from 'counterpart'

function calendarHeader ({type, id}) {
  if (type === 'people' && id === 'me') {
    return `${CP.translate('calendarType.personal')}`
  }

  const cpKey = `calendarType.${type}`
  return `${CP.translate(cpKey)} ${id}`
}

export default function Header ({calendar, semesterName, children}) {
  return (
    <header className="Header row">
      {children}

      <h1>{calendarHeader(calendar)}</h1>
      <div className="sub-header">{semesterName}</div>
    </header>
  )
}
