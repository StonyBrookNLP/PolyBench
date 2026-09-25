# PolyBench project page

Static site for the paper *Teaching and Evaluating LLMs to Reason About Polymer Design
Related Tasks* (LM4Sci @ COLM 2026). No build step, no dependencies — plain HTML/CSS/JS.

## Enabling GitHub Pages

**Settings → Pages → Build and deployment**

- Source: **Deploy from a branch**
- Branch: **`main`**, folder: **`/docs`**

The site then goes live at `https://stonybrooknlp.github.io/PolyBench/`.

`.nojekyll` is present so GitHub serves the files as-is rather than running them
through Jekyll.

## Local preview

```sh
cd docs && python3 -m http.server 8000
# open http://localhost:8000
```

Opening `index.html` directly via `file://` mostly works, but serving it is closer to
production.

## Layout

```
docs/
├── index.html              # the whole page — five sections, all inline
├── .nojekyll
└── static/
    ├── css/style.css       # design tokens at the top, then section-by-section styles
    ├── js/main.js          # sticky nav, scroll-spy, copy-BibTeX button
    └── images/             # figures (see below)
```

The camera-ready PDF is **not** in this repo — see `.gitignore`. The hero's "Paper" button
is a placeholder until the paper has a public URL (arXiv or the workshop proceedings).

## Adding or replacing figures

Drop the file into `static/images/` and point an `<img>` at it. The figure currently on
the page was extracted from the camera-ready PDF at ~2400px wide; **replace it by
overwriting the file with the same name** — no HTML edit needed.

| File | Used for | Section in `index.html` |
| --- | --- | --- |
| `overview.png` | Figure 2 — creation pipeline + task organization | `#build` |

The paper's other figures (CoT quality ratings, human preference study, length-vs-judge
correlations) are not on the page. They can be re-extracted from the camera-ready PDF with
`pypdf` if a section ever needs them again.

To add a *new* figure, copy this block and adjust:

```html
<figure>
  <div class="figframe">
    <img src="static/images/YOUR_FILE.png"
         alt="Describe what the figure shows, for screen readers."
         width="2400" height="1578" loading="lazy">
  </div>
  <figcaption>
    <strong>Figure N.</strong> Caption text.
  </figcaption>
</figure>
```

Notes:

- `.figframe` puts the image on a white card, so figures with colored panels and embedded
  logos sit cleanly against the page.
- Set `width`/`height` to the image's real pixel dimensions so the browser reserves
  space and the page doesn't jump while loading.
- Keep figures under ~1.5 MB. To downscale and flatten transparency onto white:

  ```sh
  python3 -c "
  from PIL import Image
  im = Image.open('in.png').convert('RGBA')
  bg = Image.new('RGBA', im.size, (255,255,255,255))
  out = Image.alpha_composite(bg, im).convert('RGB')
  out = out.resize((2400, round(out.height*2400/out.width)), Image.LANCZOS)
  out.save('static/images/out.png', optimize=True)"
  ```

## Common edits

**Flipping a "Soon" button to a real link.** In the hero, the Paper / Dataset / Models /
arXiv buttons are `<span class="btn btn--soon">` placeholders. Change the `<span>` to an
`<a href="...">`, drop the `btn--soon` class, and delete the `<span class="tag">Soon</span>`.
For the paper specifically, point it at the arXiv or proceedings URL rather than
re-adding the PDF to the repo, and restore the "Paper (PDF)" link in the footer.

**Results table.** `#results` holds the PolyBench test-set table. Best-per-column values
carry `class="num ... best"`, which renders bold with an accent underline — if you change a
number, move that class too. Rows under "Trained on PolyBench" use `class="ours"` for the
tinted background.

**Colors and spacing.** Everything is a CSS custom property in the `:root` block at the
top of `style.css` — including the six per-category hues `--t1`…`--t6`. Change a token, not
the rules that use it.

**Light mode only.** The page has no dark theme and no theme toggle: `color-scheme: light`
on `:root` pins it, so it renders the same regardless of the visitor's OS setting.
`.figframe` keeps figures on a white card, which is why raster figures stay faithful.

**Social preview image.** The `og:image` meta tag points at
`static/images/overview.png` via an absolute URL. If the repo or org name changes,
update that URL.
