import React, {Component, PropTypes} from 'react'
import Loading from './Loading'
import Preload from './Preload'
import KeyboardNav from './KeyboardNav'
import KeyboardNavItem from './KeyboardNavItem'
import getSuggestions from '../getSuggestions'
import stripTags from 'underscore.string/stripTags'
import previewStyle from './styles.css'

const wrapperStyles = {
  alignSelf: 'flex-start',
  width:     '100%',
  margin:    '-10px'
}

const listStyles = {
  margin:  0,
  padding: 0
}

export default class Preview extends Component {
  renderSuggestions(suggestions, searchFn) {
    return (
      <div style={wrapperStyles}>
        <KeyboardNav>
          <ul style={listStyles}>
            {
              suggestions.map(s => (
                <KeyboardNavItem
                  key={s.id}
                  tagName={'li'}
                  onSelect={() => searchFn(s.title)}
                >
                  <div className={previewStyle.title}>{s.title}</div>
                  <div className={previewStyle.excerpt}>{stripTags(s.excerpt)}</div>
                </KeyboardNavItem>
              ))
            }
          </ul>
        </KeyboardNav>
      </div>
    )
  }

  render() {
    const {query, search} = this.props
    return (
      <Preload promise={getSuggestions(query)} loader={<Loading />}>
        {(suggestions) => this.renderSuggestions(suggestions || [], search)}
      </Preload>
    )
  }
}
