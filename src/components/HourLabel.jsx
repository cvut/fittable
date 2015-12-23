import React from 'react'

export default function HourLabel ({position, length, layout, children}) {
  let style
  if (layout === 'horizontal') {
    style = {
      left: position * 100 + '%',
      width: length * 100 + '%',
    }
  } else {
    style = {
      top: position * 100 + '%',
      height: length * 100 + '%',
    }
  }

  return <div className="HourLabel" style={style} />
}
