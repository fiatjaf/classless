/* global fetch */

const h = require('react-hyperscript')
const React = require('react')

module.exports = class extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      css: this.rawgit()
    }
  }

  rawgit (sha) {
    let theme = this.props.theme

    return sha
      ? `https://cdn.rawgit.com/fiatjaf/classless/${sha}/themes/${theme}/theme.css`
      : `https://rawgit.com/fiatjaf/classless/master/themes/${theme}/theme.css`
  }

  componentDidMount () {
    let sha = sessionStorage.getItem('last-commit')
    if (sha) {
      this.setState({
        css: this.rawgit(sha)
      })
    } else {
      fetch('https://api.github.com/repos/fiatjaf/classless/commits')
        .then(r => r.json())
        .then(body => {
          let sha = body[0].sha.slice(0, 8)
          this.setState({
            css: this.rawgit(sha)
          })
          sessionStorage.setItem('last-commit', sha)
        })
        .catch(e => {
          console.log(`failed to load last commit sha from github, will default to show the rawgit development url for ${this.props.theme}.`)
        })
    }
  }

  render () {
    return [
      h('header', {key: 'header'}, [
        h('h1', [
          h('a', {href: '/themes'}, 'Themes')
        ])
      ]),
      h('article', {key: 'article'}, [
        h('header', [
          h('h1', [
            h('a', {rel: 'bookmark', href: ''}, this.props.theme)
          ]),
          h('aside', [])
        ]),
        h('div', [
          h('div', {
            dangerouslySetInnerHTML: {
              __html: this.props.descHTML
            }
          }),
          h('p', [
            'Include URL: ',
            h('code', {
              style: {
                display: 'block',
                padding: '3px 8px',
                margin: '2px 3px',
                backgroundColor: '#efefef',
                color: '#343434'
              }
            }, this.state.css)
          ]),
          h('br'),
          h('div', {
            style: {
              display: 'flex',
              flexWrap: 'wrap'
            }
          }, this.props.screenshots.map(p =>
            h('a', {href: `/${p}`}, [
              h('img', {src: `/${p}`, style: {border: '3px solid'}})
            ])
          ))
        ])
      ])
    ]
  }
}
