const h = require('react-hyperscript')
const Helmet = require('react-helmet').default
const React = require('react')

module.exports = class extends React.Component {
  constructor (props) {
    super(props)

    let theme = (
      (this.props.location.search ||
        typeof location === 'undefined' ? '' : location.search
      ).split('?')[1] || ''
    )
      .split('&')
      .map(kv => kv.split('='))
      .filter(([k, v]) => k === 'theme')
      .map(([_, v]) => v)[0] || this.props.global.themes[0]

    this.state = {
      theme: theme.startsWith('http') ? theme : 'https://rawgit.com/fiatjaf/classless/gh-pages/themes/' + theme + '/theme.css'
    }
  }

  render () {
    let navitems = this.props.scenarioList
      ? this.props.scenarioList.map(name =>
        h('li', {key: name}, [
          h('a', {href: '/scenarios/' + name}, name)
        ])
      )
      : [
        h('li', [ h('a', {href: '/'}, 'Introduction') ]),
        h('li', [ h('a', {href: '/for-personal-websites'}, 'For personal websites') ]),
        h('li', [ h('a', {href: '/for-cms-makers'}, 'For CMS markers') ]),
        h('li', [ h('a', {href: '/for-theme-writers'}, 'For theme writers') ]),
        h('li', [ h('a', {href: '/scenarios'}, 'Testing scenarios') ]),
        h('li', [ h('a', {href: 'https://github.com/websitesfortrello/classless/tree/gh-pages/themes'}, 'Browse the themes') ])
      ]

    let main = this.props.scenarioList
      ? h(React.Fragment, {key: 'main'}, this.props.children)
      : h('main', {key: 'main'}, this.props.children)

    return [
      h(Helmet, {
        key: 'helmet',
        link: [{rel: 'stylesheet', href: this.state.theme}]
      }),
      h('header', {key: 'header', role: 'banner'}, [
        h('h1', [
          h('a', {href: '/'}, 'classless')
        ]),
        h('aside', [
          h('p', 'Pure-CSS themes for standard HTML formats.')
        ])
      ]),
      h('nav', {key: 'nav'}, [
        h('ul', navitems)
      ]),
      main,
      h('aside', {key: 'aside'}, [
        h('form', {action: 'https://formspree.io/fiatjaf@gmail.com', method: 'POST'}, [
          h('legend', 'Need a custom theme? Want to know more about Classless? Talk to us!'),
          h('label', [
            'Your email: ',
            h('input', {type: 'text', name: '_replyto'})
          ]),
          h('label', [
            'Your message: ',
            h('textarea', {name: 'message', placeholder: 'Your message'})
          ])
        ])
      ]),
      h('footer', {
        key: 'footer',
        role: 'contentinfo',
        dangerouslySetInnerHTML: {__html: this.props.global.footer}
      }),
      h('script', {
        key: 'trackingco.de',
        dangerouslySetInnerHTML: {
          __html: `
(function (d, s, c) {
  var x, h, n = Date.now()
  tc = function (p) {
    m = s.getItem('_tcx') > n ? s.getItem('_tch') : 'tarola-tagarela'
    x = new XMLHttpRequest()
    x.addEventListener('load', function () {
      if (x.status == 200) {
        s.setItem('_tch', x.responseText)
        s.setItem('_tcx', n + 14400000)
      }
    })
    x.open('GET', 'https://visitantes.alhur.es/'+m+'.xml?r='+d.referrer+'&c='+c+(p?'&p='+p:''))
    x.send()
  }
  tc()
})(document, localStorage, 'yklzb7m1')
          `
        }
      }),
      h('script', {key: 'bundle', src: '/bundle.js'})
    ]
  }
}
