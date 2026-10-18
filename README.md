# ActiveCalculator WordPress plugin

Source for the [ActiveCalculator plugin on WordPress.org](https://wordpress.org/plugins/activecalculator/). It embeds calculators built with [ActiveCalculator](https://activecalculator.com) using a block, the `[activecalculator id="…"]` shortcode or an Elementor widget.

The WordPress.org listing text lives in `readme.txt`. This file is for developers.

## How it works

- `includes/embed.php` builds every embed: a `<div data-calc-id>` holding the calculator `<iframe>` (with a title, lazy loading and a 600px starting height). ActiveCalculator's `embed.js`, enqueued only when a calculator renders, takes over the iframe and resizes it.
- The block (`src/`) is rendered on the server by `src/render.php`. `src/deprecated.js` converts blocks saved by 1.0.0, which stored a static iframe in the post.
- `includes/shortcode.php` and `includes/elementor/` use the same renderer.
- `includes/compat.php` keeps caching plugins (WP Rocket, LiteSpeed Cache, FlyingPress, WP-Optimize) from delaying `embed.js`.
- The plugin stores nothing in the database and never calls ActiveCalculator from PHP.

## Develop

Requires Node 22 and Docker.

```bash
npm install
npm run env:start      # builds the release copy and starts WordPress 7.1 at http://localhost:8888 (admin / password)
npm start              # rebuilds the block on change; run `npm run dist` to refresh the copy WordPress uses
```

The local site runs the release copy in `.dist/activecalculator/` (what WordPress.org will ship), plus Plugin Check and Elementor.

## Check

```bash
npm run test:unit      # parser unit tests (Node's built-in test runner)
npm run lint:js
npm run lint:css
npm run plugin-check   # WordPress.org Plugin Check against the release copy (wp-env must be running)
npm run plugin-zip     # builds activecalculator.zip with exactly what ships
```

## What ships

Everything except what `.distignore` lists. The release keeps `src/` and `package.json` so the compiled `build/` files have readable source (WordPress.org guideline 4).

## Release

1. Set the same version in `activecalculator-block.php` (`Version`), `readme.txt` (`Stable tag`), `src/block.json` and `package.json`.
2. Merge to `main`.
3. Publish a GitHub release whose tag is the version, with no `v` (for example `1.1.0`).

`.github/workflows/deploy.yml` then tests, builds, checks that all version numbers match, and commits the release to WordPress.org SVN (`trunk`, `tags/<version>`, and `assets` from `.wordpress-org/`). Run the workflow by hand from the Actions tab for a dry run.

The workflow needs the repository secrets `SVN_USERNAME` and `SVN_PASSWORD`. Use the WordPress.org SVN password from the committer's profile (Account & Security), not the login password.

Listing artwork (banners, icons, screenshots) lives in `.wordpress-org/`.
