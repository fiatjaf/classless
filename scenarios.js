const h = require('react-hyperscript')

module.exports = function ({list, chosen}) {
  if (chosen) {
    return h('main', {
      dangerouslySetInnerHTML: {__html: chosen.html}
    })
  } else {
    return ''
  }
}
