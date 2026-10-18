<?php
/**
 * The [activecalculator id="…"] shortcode, for the classic editor and page builders.
 *
 * @package activecalculator
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Renders [activecalculator id="…"]. The id can be a calculator ID, its embed code or an ActiveCalculator link.
 *
 * @param array|string $atts Shortcode attributes.
 * @return string Embed HTML. Empty for visitors when the id is missing or invalid.
 */
function activecalculator_shortcode( $atts ) {
	$atts = shortcode_atts( array( 'id' => '' ), $atts, 'activecalculator' );
	$id   = activecalculator_sanitize_id( $atts['id'] );

	// Inside Elementor's editor (Shortcode widget), show a placeholder so editing doesn't use impressions.
	if ( activecalculator_is_elementor_editor() ) {
		return activecalculator_editor_placeholder( $id );
	}

	if ( '' === $id ) {
		if ( current_user_can( 'edit_posts' ) ) {
			return '<!-- ' . esc_html__( 'ActiveCalculator: the shortcode needs a valid calculator ID, e.g. [activecalculator id="your-calculator-id"]', 'activecalculator' ) . ' -->';
		}
		return '';
	}

	return activecalculator_render_embed( $id );
}
add_shortcode( 'activecalculator', 'activecalculator_shortcode' );
