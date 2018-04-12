const h = require('react-hyperscript')
const Helmet = require('react-helmet').default
const React = require('react')
const Draggable = require('react-draggable')
const Autocomplete = require('react-autocomplete')
const fetchJS = require('fetch-js')

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
      .map(([_, v]) => v)[0] ||
        (typeof localStorage === 'undefined' ? null : localStorage.getItem('theme')) ||
        this.props.global.themes[parseInt(this.props.global.themes.length * Math.random())]

    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('theme', theme)
    }

    this.state = {
      theme,
      livereload: null,
      editing_livereload: false,
      theme_chooser_widget: true
    }
  }

  componentDidMount () {
    if (localStorage.getItem('livereload')) {
      this.setState({livereload: localStorage.getItem('livereload')})
      fetchJS(process.env.LIVERELOAD)
    } else if (process.env.LIVERELOAD) {
      if (process.env.LIVERELOAD.indexOf(location.hostname) !== -1) {
        this.setState({livereload: process.env.LIVERELOAD})
        fetchJS(process.env.LIVERELOAD)
      }
    }

    window.setTheme = (theme) => {
      this.setState({theme})
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
        h('li', [ h('a', {href: '/for-cms-makers'}, 'For CMS makers') ]),
        h('li', [ h('a', {href: '/for-theme-writers'}, 'For theme writers') ]),
        h('li', [ h('a', {href: '/scenarios'}, 'Testing scenarios') ]),
        h('li', [ h('a', {href: '/themes'}, 'The themes') ])
      ]

    let main = this.props.scenarioList
      ? h(React.Fragment, {key: 'main'}, this.props.children)
      : h('main', {key: 'main'}, this.props.children)

    return [
      h(Helmet, {
        key: 'helmet',
        link: [{
          rel: 'stylesheet',
          href: this.state.theme.startsWith('http')
            ? this.state.theme
            : 'https://rawgit.com/fiatjaf/classless/master/themes/' + this.state.theme + '/theme.css'
        }]
      }),
      h('header', {key: 'header', role: 'banner'}, [
        Math.random() < 0.667
          ? Math.random() < 0.5
            ? h('img', {src: 'https://picsum.photos/1024/768/?image=929'})
            : (
              h('a', {href: '#'}, [
                h('img', {src: 'https://picsum.photos/1024/768/?image=929'})
              ])
            )
          : null,
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
        h('p', 'Classless themes is an initiative that tries to bring DRY to the site theming domain of the internet. You can contribute by using the Classless template in your site or by creating/porting themes to the project!')
      ]),
      h('footer', {
        key: 'footer',
        role: 'contentinfo'
      }, [
        h('p', [
          h('a', {href: 'https://fiatjaf.alhur.es/'}, '@fiatjaf'),
          ' 2018. ',
          'Page generated with ',
          h('a', {href: 'https://github.com/fiatjaf/sitio'}, 'sitio'),
          '. ',
          h('a', {href: 'https://github.com/fiatjaf/classless'}, 'GitHub repository.')
        ])
      ]),
      this.state.theme_chooser_widget && h(Draggable, {
        key: 'theme-chooser',
        onStart: e => {
          if (e.target.tagName === 'INPUT') {
            return false
          }
        }
      }, [
        h('#theme-chooser', [
          h('label', [
            'choose a theme or paste your CSS URL:',
            h(Autocomplete, {
              items: this.props.global.themes,
              getItemValue: x => x,
              renderItem: (v, highlighted) => (
                h('div', {
                  key: v,
                  background: highlighted ? 'lightgray' : 'white'
                }, v)
              ),
              value: this.state.theme,
              onChange: e => {
                localStorage.setItem('theme', e.target.value)
                this.setState({theme: e.target.value})
              },
              onSelect: v => {
                localStorage.setItem('theme', v)
                this.setState({theme: v})
              },
              menuStyle: {
                borderRadius: '3px',
                boxShadow: '0 2px 12px rgba(0, 0, 0, 0.1)',
                background: 'rgba(255, 255, 255, 0.9)',
                padding: '2px 0',
                overflow: 'auto'
              }
            }),
            h('button', {
              onClick: e => {
                e.preventDefault()
                this.setState({
                  editing_livereload: !this.state.editing_livereload
                })
              }
            }, this.state.editing_livereload
              ? 'close'
              : this.state.livereload ? 'livereload enabled' : 'set livereload'
            )
          ]),
          this.state.editing_livereload && h('form', {
            onSubmit: e => {
              e.preventDefault()
              localStorage.setItem('livereload', e.target.livereload.value)
              this.setState({
                livereload: e.target.livereload.value,
                editing_livereload: false
              })
              fetchJS(e.target.livereload.value)
            }
          }, [
            h('label', [
              'paste your livereload server URL here and click "done": ',
              h('input', {name: 'livereload', defaultValue: this.state.livereload || ''})
            ]),
            h('button', 'done')
          ])
        ])
      ]),
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
