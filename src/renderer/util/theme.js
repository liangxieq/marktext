import { THEME_STYLE_ID, COMMON_STYLE_ID, DEFAULT_CODE_FONT_FAMILY, railscastsThemes } from '../config'
import { dark, ulysses, graphite } from './themeColor'

export const addThemeStyle = theme => {
  let themeStyleEle = document.querySelector(`#${THEME_STYLE_ID}`)
  if (!themeStyleEle) {
    themeStyleEle = document.createElement('style')
    themeStyleEle.id = THEME_STYLE_ID
    document.head.appendChild(themeStyleEle)
  }
  switch (theme) {
    case 'light':
      themeStyleEle.innerHTML = ''
      break
    case 'dark':
      themeStyleEle.innerHTML = dark
      break
    case 'ulysses':
      themeStyleEle.innerHTML = ulysses
      break
    case 'graphite':
      themeStyleEle.innerHTML = graphite
      break
    default:
      console.log('unknown theme')
      break
  }

  // change codeMirror theme
  const cm = document.querySelector('.CodeMirror')
  if (cm) {
    if (railscastsThemes.includes(theme)) {
      cm.classList.remove('cm-s-default')
      cm.classList.add('cm-s-railscasts')
    } else {
      cm.classList.add('cm-s-default')
      cm.classList.remove('cm-s-railscasts')
    }
  }
}

export const addCommonStyle = style => {
  const { codeFontFamily, codeFontSize } = style
  let sheet = document.querySelector(`#${COMMON_STYLE_ID}`)
  if (!sheet) {
    sheet = document.createElement('style')
    sheet.id = COMMON_STYLE_ID
    document.head.appendChild(sheet)
  }
  sheet.innerHTML = `
span code,
td code,
th code,
code,
code[class*="language-"],
.CodeMirror,
pre.ag-paragraph {
font-family: ${codeFontFamily}, ${DEFAULT_CODE_FONT_FAMILY};
font-size: ${codeFontSize};
}
`
}

// Append common sheet and theme at the end of head - order is important.
export const addStyles = style => {
  const { theme } = style
  addThemeStyle(theme)
  addCommonStyle(style)
}
