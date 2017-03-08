import {memoize} from 'cerebro-tools'

/**
 * Get google suggestions for entered query
 * @param  {String} query
 * @return {Promise}
 */
const getSuggestions = (query) => {
  const url = `https://developer.mozilla.org/search?format=json&q=${query}`
  return fetch(url)
    .then(response => response.json())
    .then(json => json.documents.map(document => ({
      id:      document.id,
      title:   document.title,
      excerpt: document.excerpt,
      url:     document.url,
      tags:    document.tags
    })))
};


export default memoize(getSuggestions, {
  length:   false,
  promise:  'then',
  // Expire translation cache in 30 minutes
  maxAge:   30 * 60 * 1000,
  preFetch: true
})
