'use strict';

import React from 'react'
import Preview from './Preview'

const ICON_FILE = require('./icon.png');
const MDN_REGEX = /mdn\s+(.*)/i;

const plugin = ({term, display, actions}) => {
  if (MDN_REGEX.test(term)) {
    const openBrowser = (url) => {
      actions.open(url);
      actions.hideWindow()
    };

    const searchMDN = (query) => {
      let q   = encodeURIComponent(query);
      let url = `https://developer.mozilla.org/search?q=${q}`;
      openBrowser(url);
    };

    let [, mdnQuery] = MDN_REGEX.exec(term);

    display({
      icon:       ICON_FILE,
      title:      `Search MDN for ${mdnQuery}`,
      onSelect:   () => searchMDN(mdnQuery),
      getPreview: () => <Preview query={mdnQuery} key={mdnQuery} openBrowser={openBrowser}/>
    })
  }
};

module.exports = {
  fn: plugin,
  icon: ICON_FILE,
  name: 'Mozilla Develpment Network',
  keyword: 'mdn'
};
