# html-chords

### Overview

(there is a detailed overview in Russian here: http://myx.ostankin.net/html-chords)

A jQuery add-on script for rendering guitar chords inlined into HTML pages. The source format is as follows:

```
W{C}elcome to the Hotel Calif{G}ornia.
Such a l{B7}ovely place, such a l{Em}ovely face
```

And it gets rendered in the following way:

```
 C                        G
Welcome to the Hotel California.
        B7                   Em
Such a lovely place, such a lovely face
```

Also, it is possible to transpose the chords into a different key.

There are two types of chords: superscript and inline. Inline ones are identified
by an underscore in the beginning: `{_Am}` - these are usually needed in intros or
in comments to the song (e.g. "_Strictly speaking the chorus starts with `Dm(maj)7`,
but it can be simplified to just `Dm`_").

Assumptions and limitations:
* The script affects only the document areas within `<div class="song">` elements. The number of such elements is not limited.
* The script assumes that each verse is wrapped into `<p>` tag.
* The script adds padding over each line in each verse, regardless of the presence of chords in them. I couldn't find an elegant solution for distinguishing verses with and without chords.
* Symbols `{` and `}` can't be escaped - this means they may not appear in the song texts.
* Since there are several ways to denote the same note, transpositions up and down are different. Step down always use "flats", steps up always uses "sharp". The script understands both `B` and `Bb` as "B flat", however always uses `H` during transpositions.
* To place the control for key change, insert `<div class="transposition"></div>` element anywhere in the song text. The number of such elements is not limted.
* When needed to put a chord over an empty space (e.g. before the line begins or after it ends), one can put any number of spaces into the chord, or even use an empty structure `{  }` as a padding element with an arbitrary number of spaces. Spaces outside the curly braces will be ignored by HTML-interpreter.

### Installation

Add `html-chords.css` and `html-chords.js` into the header of the page.
The script also requires jQuery, so if the page does not use it already,
add `jquery.js` as well:

```
<link rel="stylesheet" href="css/html-chords.css" />
<script type="text/javascript" src="js/jquery.js"></script>
<script type="text/javascript" src="js/html-chords.js"></script>
```

Two example HTMLs are an illustration of how the script works. `style.css` is also not a part of the module, but it is used in the example to beautify the pages. I do not own this CSS, it is taken from [Truly Simple Free CSS Template ](http://www.free-css.com/free-css-templates/page41/truly-simple) by Igor Penjivrag.

### Customization

By default the key change elements are written in English.
They can be also translated into Russian by adding a `id="html-chords-script" lang="ru"` attributes into the header script element:

```
<script type="text/javascript" src="js/html-chords.js" id="html-chords-script" lang="ru" ></script>
```

Adding more languages is more than welcome :)
