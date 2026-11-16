# khay.me

Personal site for K (Okkar). One static page, plain HTML and CSS, no build step. GitHub Pages serves it from the `main` branch at the repository root. The custom domain is `khay.me` (`CNAME`). `.nojekyll` keeps Pages from running Jekyll.

## Files

- `index.html` — the page
- `styles.css` — layout, type, and light/dark colors
- `favicon.svg` — the K mark
- `CNAME` — `khay.me`
- `.nojekyll` — serve files as-is

## What is already true

These are the only facts on the page:

- Name: K, who also goes by Okkar
- Based in Singapore
- GitHub: https://github.com/khay
- X: https://x.com/khayusaki

There is no email address yet. Add one only when it should be public.

## Editing

Anything else is a placeholder. On the page it shows up as italic text in brackets, for example `[placeholder: short bio]`. The line above it in `index.html` is an HTML comment:

```html
<!-- TODO(K): replace the next paragraph with a short bio in your own words. -->
<p class="slot">[placeholder: short bio]</p>
```

Replace the bracketed text with your own words and delete the comment. Leave the `slot` class off once the sentence is real, or the text stays muted and italic. For selected work, duplicate the `<li>` for each project. For the photo, swap the placeholder for an `<img>` in the same folder (see the comment in the about section).

An optional share image is noted in the `<head>` (`og:image` / `twitter:image`). Skip it until you have one.

## Local preview

From the repository root:

```sh
python3 -m http.server 8080
```

Open http://127.0.0.1:8080. Colors follow the system light or dark setting.

## GitHub Pages

In the repository settings, set Pages to deploy from the `main` branch, folder `/` (root). DNS for `khay.me` should point at GitHub Pages. The `CNAME` file sets the domain; turn on HTTPS once the certificate is ready.
