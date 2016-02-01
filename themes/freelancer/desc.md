The [Freelancer theme](http://startbootstrap.com/template-overviews/freelancer/) from [Start Bootstrap](http://startbootstrap.com/) adapted to Classless.

Originally for freelancer work showcasing in a single-page website, This works with standalone articles[1] and with lists of articles using the coloured photo boxes[2]. The coloured boxes also works with simple pictures, as in the original theme[3].

Ported by [@fiatjaf](https://github.com/fiatjaf) based on the original work by [David Miller](http://davidmiller.io/).

---

[1]: Articles are shown as blocks of text. If you have more than one `<article>` or `<section>` in the `<main>`, the backgrounds alternate between white and that hot green.

[2]: As with all Classless themes, the markup for lists of articles is

```html
<ul>
  <li>
    <article>
      <img> <!-- or <a href><img></a> -->
      <h1>Title</h1> <!-- or <h1><a href>Title</a></h1> -->
    </article>
  </li>
  ...
</ul>
```

If there is an image it will be shown with a round border -- try to make it squared. If not, the title will be shown -- be sure to make it small. All other elements will be hidden.

[3]: The markup for that is a list of pictures:

```html
<ul>
  <li>
    <img>  <!-- or <a href><img></a> -->
  </li>
</ul>
```
