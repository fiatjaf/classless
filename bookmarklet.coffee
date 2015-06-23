tl         = require 'talio'
Promise    = require 'lie'
superagent = (require 'superagent-promise')((require 'superagent'), Promise)

window.selectize = require 'selectize'
window.$ = require 'jquery'
Selectize = require 'talio-selectize'
Selectize.init tl.delegator

{div, span, pre, nav, fieldset,
 small, i, p, a, button, strong, h1,
 form, legend, fieldset, input, textarea, select,
 table, thead, tbody, tfoot, tr, th, td,
 ul, li} = require 'virtual-elements'

# remove other css
for style in document.querySelectorAll('style')
  style.parentNode.removeChild style
for link in document.querySelectorAll('link[rel="stylesheet"]')
  link.parentNode.removeChild link
# ~

stylesheet = document.createElement 'link'
stylesheet.rel = 'stylesheet'
stylesheet.id = 'classless-theme'
document.getElementsByTagName('head')[0].appendChild stylesheet

handlers =
  themeChanged: (State, theme) ->
    if theme.value.slice(0, 4) == 'http'
      stylesheet.href = theme.value
    else
      stylesheet.href = "//rawgit.com/fiatjaf/classless/gh-pages/themes/#{theme.value}.css"
  scenarioChanged: (State, scenario) ->
    Promise.resolve().then(->
      superagent
        .get("//rawgit.com/fiatjaf/classless/gh-pages/scenarios/#{scenario.value}.html")
        .end()
    ).then((res) ->
      $('#classless-widget').appendTo('head')
      $('body').html(res.text)
      $('#classless-widget').appendTo('body')
    ).catch(console.log.bind console)

window.setClasslessTheme = (name) -> handlers.themeChanged null, {value: name}

vrenderMain = (state, channels) ->
  themes = [
    {name: 'lebo'}
    {name: 'jeen'}
    {name: 'wardrobe'}
    {name: 'ghostwriter'}
    {name: 'festively'}
    {name: 'aluod'}
    {name: 'dbyll'}
  ]

  scenarios = [
    'list-of-posts'
    'list-of-posts-with-images'
    'list-of-posts-with-excerpts'
    'post-simple'
    'post-with-images'
    'post-with-checklists'
    'post-with-header-image'
  ]

  (fieldset
    id: "classless-widget"
    style: {"border":"2px dotted black","width":"200px","position":"fixed","right":"22px","top":"15px","z-index":"1000","background":"white"}
  ,
    (div style: {"padding":"10px"},
      (strong {style: {color: 'black'}}, "THEME")
      (p {}, 'see this page with another theme.')
      (Selectize
        value: null
        options: themes
        create: true
        persist: false
        valueField: 'name'
        labelField: 'name'
        searchField: ['name']
        closeAfterSelect: true
        'ev-change': tl.sendDetail channels.themeChanged
        render:
          option_create: (data, escape) ->
            "<div class='create'>Use the URL <strong>#{escape data.input}</strong></div>"
      )
    )
    (div style: {"padding":"10px"},
      (strong {style: {'color': 'black'}}, "EXAMPLE TEMPLATES")
      (p {}, 'see this theme with other HTML.')
      (ul style: {"padding":"0px"},
        (li {style: {"list-style":"none"}},
          (button
            style: {style: {"padding":"7px"}}
            'ev-click': tl.sendClick channels.scenarioChanged, {value: scenario}
           , scenario)
        ) for scenario in scenarios
      )
    )
    (div {style: {'padding': '10px'}},
      (small {}, 'add the following link to your favorites bar and use it on any page with HTML following the classless standard: ')
      (a
        style: {'border': '2px solid gray', 'background': 'gray', 'color': 'white', 'padding': '1px 5px'}
        href: "javascript:script = document.createElement('script');script.src = 'http://fiatjaf.alhur.es/classless/build/bookmarklet.js';document.getElementsByTagName('head')[0].appendChild(script);"
      , 'classless')
    )
  )

tl.run document.body, vrenderMain, handlers

# selectize css
$('<link rel="stylesheet" href="http://cdnjs.cloudflare.com/ajax/libs/selectize.js/0.12.1/css/selectize.default.min.css">').appendTo('head')
# ~
