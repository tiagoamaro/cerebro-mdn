'use strict';

const icon = require('./icon.png')
const mdnRegex = /mdn\s+(.*)/i

const plugin = ({term, display, actions}) => {
  if (mdnRegex.test(term)) {
    const openMdn = (query) => {
      let q = encodeURIComponent(query)
      actions.open(`https://developer.mozilla.org/search?q=${q}`)
      actions.hideWindow()
    }

    let [, mdnQuery] = mdnRegex.exec(term)

    display({
      icon: icon,
      title: `Open MDN for ${mdnQuery}`,
      onSelect: () => openMdn(mdnQuery)
    })
  }
};

module.exports = {
  fn: plugin
}
