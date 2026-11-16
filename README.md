# khay.me

Personal site for K. One static page, plain HTML and CSS, no build step. GitHub Pages serves it from the `main` branch at the repository root. The custom domain is `khay.me` (`CNAME`). `.nojekyll` keeps Pages from running Jekyll.

## Files

- `index.html` — the page: the portrait, a short about paragraph, and icon links
- `styles.css` — layout, type, and light/dark colors
- `avatar.jpg` — K's picture from X, used in place of the name and as the browser icon
- `CNAME` — `khay.me`
- `.nojekyll` — serve files as-is

## Editing

The about paragraph is in `index.html`. The icon links are GitHub, X, and LinkedIn. Each link has an `aria-label` and a `title`.

## Local preview

From the repository root:

```sh
python3 -m http.server 8080
```

Open http://127.0.0.1:8080. Colors follow the system light or dark setting.

## GitHub Pages

In the repository settings, set Pages to deploy from the `main` branch, folder `/` (root). DNS for `khay.me` should point at GitHub Pages. The `CNAME` file sets the domain; turn on HTTPS once the certificate is ready.
