<?php
/**
 * Front-end output of the ActiveCalculator block.
 *
 * Runs once per block instance, so it only calls the shared renderer in includes/embed.php.
 *
 * @package activecalculator
 *
 * @var array $attributes Block attributes.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

echo wp_kses(
	activecalculator_render_embed(
		isset( $attributes['id'] ) ? $attributes['id'] : '',
		get_block_wrapper_attributes()
	),
	activecalculator_allowed_html()
);
