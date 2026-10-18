=== ActiveCalculator – Price Calculator Builder ===
Contributors: progrmoiz
Tags: calculator, calculator builder, price calculator, cost calculator, quote calculator
Requires at least: 6.3
Tested up to: 7.1
Requires PHP: 7.4
Stable tag: 1.1.0
License: GPLv2 or later
License URI: https://www.gnu.org/licenses/gpl-2.0.html

Add price, quote and ROI calculators built with ActiveCalculator to WordPress with a block, shortcode or Elementor widget, and capture leads.

== Description ==

ActiveCalculator is a no-code calculator builder. You build a calculator in ActiveCalculator (pricing, quote, ROI, savings or a product configurator), and this plugin puts it on your WordPress pages. Visitors enter their numbers, see a personalized result right away, and can leave their contact details, so your sales team talks to people who already know the price.

= Why ActiveCalculator =

* **Matches your brand.** Pick a theme or set your own colors and fonts, so the calculator looks like part of your site.
* **Works on every device.** Calculators adapt to phones, tablets and desktops.
* **Captures leads.** Add name, email and phone fields, and send each submission to Google Sheets, a webhook, or thousands of other apps through Zapier.
* **Shows what's working.** See impressions and submissions for every calculator in your dashboard.
* **Handles real pricing.** Formulas, show/hide logic, multi-step pages, charts, value lookups and product configurators, with no code.
* **Starts fast.** Begin from a template, or describe your calculator and let AI build the first draft.

= Three ways to add a calculator =

* **Block editor:** add the **ActiveCalculator** block and paste your calculator's embed code, link or ID.
* **Shortcode:** `[activecalculator id="your-calculator-id"]` works in the classic editor, widgets, and page builders such as Divi, Beaver Builder, Bricks and WPBakery.
* **Elementor:** add the **ActiveCalculator** widget and paste the embed code, link or ID.

= What the plugin does for you =

* Calculators resize to fit their content, including several calculators on the same page.
* The calculator script loads only on pages that contain a calculator.
* Calculators further down a page load when visitors scroll near them.
* Works with caching plugins such as WP Rocket, LiteSpeed Cache, FlyingPress and WP-Optimize.
* Pages made with version 1.0 keep working. You don't need to re-save them.

= Good fits =

* Price and quote calculators for services (cleaning, roofing, landscaping, solar, renovations)
* ROI and savings calculators for software and B2B services
* Mortgage, loan and finance calculators
* Product configurators
* Order forms with a running total
* Booking estimates for hotels, rentals and events

== Installation ==

1. In WordPress, go to **Plugins → Add New**, search for **ActiveCalculator**, then install and activate it.
2. Build and publish a calculator at [activecalculator.com](https://activecalculator.com/?utm_source=wordpress.org&utm_medium=plugin&utm_campaign=readme). A free account is enough to start.
3. In ActiveCalculator, open **Share → Embed** and copy the embed code (or the calculator's link or ID).
4. Add it to a page with the block, the `[activecalculator id="…"]` shortcode or the Elementor widget.

Prefer to upload it? Download the zip from this page, then go to **Plugins → Add New → Upload Plugin**.

== Frequently Asked Questions ==

= Do I need an ActiveCalculator account? =

Yes. Calculators are built and hosted on ActiveCalculator. The free plan includes unlimited calculators and 100 impressions a month. The Pro plan has unlimited impressions and submissions.

= Where do I find the calculator ID? =

In ActiveCalculator, open your calculator and go to **Share → Embed**. You can paste the whole embed code from that tab, the embed link (for example `https://app.activecalculator.com/embed/…`) or just the ID. Links that use a custom name don't contain the ID, so copy the embed code from the Embed tab instead.

= How do I use the shortcode? =

Add `[activecalculator id="your-calculator-id"]` wherever shortcodes work. The `id` can be the calculator ID or its embed link.

= How do I add a calculator in Elementor, Divi or another page builder? =

In Elementor, search the widget panel for **ActiveCalculator**. In Divi, Beaver Builder, Bricks, WPBakery and other builders, put the shortcode in the builder's shortcode, text or code module.

= Where do I see the leads and responses? =

In your ActiveCalculator dashboard. Responses are stored by ActiveCalculator, not in WordPress. From there you can send them to Google Sheets, webhooks, Zapier and other tools.

= Does previewing in the editor use my impressions? =

Each time a calculator loads counts as one impression on your ActiveCalculator plan. To save them, the block editor shows the calculator only when you click **Load preview**, and the Elementor editor shows a placeholder. Your published pages always show the calculator.

= Will this slow down my site? =

The calculator script loads only on pages that contain a calculator, and calculators further down the page wait until visitors scroll near them. Nothing is added to other pages.

= My calculator doesn't appear until I click or scroll. Why? =

Some optimization plugins delay JavaScript until the visitor interacts with the page. This plugin excludes its script from WP Rocket, LiteSpeed Cache, FlyingPress and WP-Optimize automatically. With another optimization plugin, add `app.activecalculator.com/embed.js` to its "delay JavaScript" or "defer" exclusions.

= Where is the source code? =

The block editor files in `build/` are compiled from the files in `src/`, which are included in the plugin. The project is developed in public at [github.com/activecalculator/activecalculator-block](https://github.com/activecalculator/activecalculator-block). To rebuild it, run `npm install` and then `npm run build`.

== External services ==

This plugin embeds calculators hosted by ActiveCalculator (https://activecalculator.com). It needs an ActiveCalculator account to be useful, and it doesn't work without the service.

**When the service is contacted**

* On any page that contains an ActiveCalculator block, shortcode or widget, the visitor's browser loads the embed script from `https://app.activecalculator.com/embed.js` and the calculator from `https://app.activecalculator.com/embed/{calculator-id}`. Pages without a calculator don't contact ActiveCalculator.
* In the block editor, nothing is loaded from ActiveCalculator until you click **Load preview**.
* The plugin's PHP code never contacts ActiveCalculator, and the plugin stores no settings or data in WordPress.

**What data is sent**

* Each calculator load is counted as an impression, together with a random visitor ID that is kept in the visitor's browser storage for 24 hours.
* When a visitor fills in a calculator, ActiveCalculator stores their answers (including any contact details they enter), the page address, their browser, operating system and device type, and their approximate country. The visitor's IP address is used to limit abuse of submissions.
* If the calculator's owner has turned them on in ActiveCalculator, Google Analytics, Google Tag Manager or Google Maps also load inside the calculator.

ActiveCalculator terms of service: https://activecalculator.com/terms
ActiveCalculator privacy policy: https://activecalculator.com/privacy

== Screenshots ==

1. A calculator on a published page: visitors get an instant price and can leave their details.
2. Add the ActiveCalculator block and paste your calculator's embed code.
3. Preview the calculator in the block editor.
4. Add the ActiveCalculator widget in Elementor.
5. Build your calculator in ActiveCalculator.
6. Copy the embed code from Share → Embed.

== Changelog ==

= 1.1.0 =
* New: `[activecalculator]` shortcode for the classic editor and page builders.
* New: Elementor widget.
* New: paste a calculator's embed code, link or ID, with clear errors when it isn't valid.
* New: optional live preview in the block editor.
* Improved: every calculator on a page resizes to fit its content.
* Improved: the calculator script loads only on pages that need it, and calculators far down the page load when visitors scroll near them.
* Improved: compatibility with WP Rocket, LiteSpeed Cache, FlyingPress and WP-Optimize.
* Improved: calculators have an accessible title for screen readers.
* Pages made with 1.0.0 are upgraded automatically.
* Tested with WordPress 7.1.

= 1.0.0 =
* First release.

== Upgrade Notice ==

= 1.1.0 =
Adds a shortcode and an Elementor widget, fixes resizing when a page has several calculators, and is tested with WordPress 7.1. Existing calculators keep working.
