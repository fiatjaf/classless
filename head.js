const h = require('react-hyperscript')
const Helmet = require('react-helmet').default

module.exports = props =>
  h(Helmet, {
    meta: [
      {charset: 'utf-8'},
      {httpEquiv: 'x-ua-compatible', content: 'ie: edge'},
      {name: 'description', content: 'Pure-CSS themes for standard HTML formats.'},
      {name: 'viewport', content: 'width=device-width, height=device-height, initial-scale=1.0, user-scalable=yes'}
    ],
    title: props.data && props.data.name ? `${props.data.name} | classless` : 'classless',
    link: [
      {rel: 'stylesheet', href: 'style.css'}
    ],
    script: []
  })
