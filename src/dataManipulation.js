
// FIXME: this should be handled by data provider
export function invertLinkNames (linksNames) {
  const ret = {
    cs: { courses: {}, teachers: {}, exceptions: {} },
    en: { courses: {}, teachers: {}, exceptions: {} },
  }

  function addNewLinkName (key, name, type, locale) {
    ret[locale][type][key] = name
  }

  if ('teachers' in linksNames) {
    for (let tlinkname of linksNames.teachers) {
      addNewLinkName(tlinkname.id, tlinkname.name.cs, 'teachers', 'cs')
      addNewLinkName(tlinkname.id, tlinkname.name.en, 'teachers', 'en')
    }
  }

  // Save courses link names
  if ('courses' in linksNames) {
    for (let clinkname of linksNames.courses) {
      addNewLinkName(clinkname.id, clinkname.name.cs, 'courses', 'cs')
      addNewLinkName(clinkname.id, clinkname.name.en, 'courses', 'en')
    }
  }

  // Save exceptions link names
  if ('exceptions' in linksNames) {
    for (let clinkname of linksNames.exceptions) {
      addNewLinkName(clinkname.id, clinkname.name, 'exceptions', 'cs')
      addNewLinkName(clinkname.id, clinkname.name, 'exceptions', 'en')
    }
  }

  return ret
}
