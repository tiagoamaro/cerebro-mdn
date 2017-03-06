'use strict';

import React from 'react'
import Preview from './Preview'

const ICON_FILE = require('./icon.png');
const MDN_REGEX = /mdn\s+(.*)/i;

const plugin = ({term, display, actions}) => {
  if (MDN_REGEX.test(term)) {
    const searchMDN = (query) => {
      let q = encodeURIComponent(query);
      actions.open(`https://developer.mozilla.org/search?q=${q}`);
      actions.hideWindow()
    };

    let [, mdnQuery] = MDN_REGEX.exec(term);

    display({
      icon:       ICON_FILE,
      title:      `Search MDN for ${mdnQuery}`,
      onSelect:   () => searchMDN(mdnQuery),
      getPreview: () => <Preview query={mdnQuery} key={mdnQuery} search={searchMDN}/>
    })
  }
};

module.exports = {
  fn: plugin
};
