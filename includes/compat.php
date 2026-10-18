<?php
/**
 * Keeps caching and optimization plugins from delaying or rewriting ActiveCalculator's embed script.
 *
 * "Delay JavaScript" features hold scripts until the visitor clicks or scrolls, which leaves calculators
 * without resizing until then. Each filter below only appends our script to the plugin's own exclusion
 * list, and does nothing when that plugin isn't installed.
 *
 * @package activecalculator
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Adds the embed script to an exclusion list.
 *
 * @param mixed $excluded Exclusion list passed by the optimization plugin.
 * @return mixed The same list with the embed script added, or the original value if it isn't a list.
 */
function activecalculator_exclude_embed_script( $excluded ) {
	if ( ! is_array( $excluded ) ) {
		return $excluded;
	}

	$excluded[] = 'app.activecalculator.com/embed.js';

	return $excluded;
}

$activecalculator_exclusion_filters = array(
	'rocket_delay_js_exclusions',         // WP Rocket: Delay JavaScript execution.
	'rocket_exclude_defer_js',            // WP Rocket: Load JavaScript deferred.
	'rocket_exclude_js',                  // WP Rocket: Minify/combine JavaScript.
	'litespeed_optm_js_defer_exc',        // LiteSpeed Cache: JS deferred/delayed excludes.
	'litespeed_optimize_js_excludes',     // LiteSpeed Cache: JS minify/combine excludes.
	'flying_press_exclude_from_delay:js', // FlyingPress: Delay JavaScript.
	'flying_press_exclude_from_defer:js', // FlyingPress: Defer JavaScript.
	'wp-optimize-minify-blacklist',       // WP-Optimize: Minify.
);

foreach ( $activecalculator_exclusion_filters as $activecalculator_filter ) {
	add_filter( $activecalculator_filter, 'activecalculator_exclude_embed_script' );
}

unset( $activecalculator_exclusion_filters, $activecalculator_filter );
