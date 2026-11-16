# khay.me

Personal site for K (Okkar). One static page, plain HTML and CSS, no build step. GitHub Pages serves it from the `main` branch at the repository root. The custom domain is `khay.me` (`CNAME`). `.nojekyll` keeps Pages from running Jekyll.

## Files

- `index.html` — the page
- `styles.css` — layout, type, color, and motion
- `fonts/` — self-hosted Fraunces and Figtree (SIL Open Font License). No font CDN.
- `grain.png` — a small paper-grain tile
- `favicon.svg` — the K mark
- `CNAME` — `khay.me`
- `.nojekyll` — serve files as-is

## What is already true

Facts already on the page, from K and from his public LinkedIn and GitHub profiles:

- Name: K, who also goes by Okkar
- The opening line is the bio on his GitHub profile
- Solutions architect at Trusted Services; before that, software engineer there, and software architect (and earlier backend developer) at The Amdon Group
- He likes anime and games
- GitHub: https://github.com/khay
- X: https://x.com/khayusaki
- LinkedIn: https://www.linkedin.com/in/khayusaki/

The photo is still a placeholder. Singapore is not written on the page.

There is no email address yet. Add one only when it should be public.

## Editing

The photo is still a placeholder. It shows up in brackets, with an HTML comment above it:

```html
<!-- TODO(K): replace this figure with a photo, for example
     <img src="photo.jpg" alt="K" width="800" height="1000">
     then delete this comment and the placeholder. -->
<p class="slot photo-slot">[placeholder: photo]</p>
```

Replace that block with an image and delete the comment.

An optional share image is noted in the `<head>` (`og:image` / `twitter:image`). Skip it until you have one.

## Local preview

From the repository root:

```sh
python3 -m http.server 8080
```

Open http://127.0.0.1:8080. Colors follow the system light or dark setting.

## GitHub Pages

In the repository settings, set Pages to deploy from the `main` branch, folder `/` (root). DNS for `khay.me` should point at GitHub Pages. The `CNAME` file sets the domain; turn on HTTPS once the certificate is ready.
