<?php
/**
 * Shared embed output for the block, the shortcode and the Elementor widget.
 *
 * Every embed is a <div data-calc-id> holding the calculator iframe. The iframe is written here so it has
 * an accessible title and shows even when a caching plugin delays JavaScript. ActiveCalculator's embed.js
 * then takes over the existing iframe and resizes it to the calculator's height.
 *
 * @package activecalculator
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Starting height of the calculator iframe, in pixels, before embed.js resizes it.
 */
define( 'ACTIVECALCULATOR_INITIAL_HEIGHT', 600 );

/**
 * Pattern for calculator IDs: cuid/cuid2 (20–32 letters and digits) or a uuid. Hyphenated words such as a
 * custom link name must not match. Kept in sync with src/utils/parse-calculator-input.js.
 */
define( 'ACTIVECALCULATOR_ID_PATTERN', '/^(?:[a-z0-9]{20,32}|[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})$/i' );

/**
 * Turns a calculator ID, embed code or ActiveCalculator link into a calculator ID.
 *
 * Accepts a bare ID, the embed code from Share → Embed (<div data-calc-id="…"> or the older
 * <iframe src=".../embed/…">), or a link on activecalculator.com (or a subdomain) whose last path segment
 * is the ID, such as https://app.activecalculator.com/embed/{id}. Anything else returns an empty string.
 * Mirrors parseCalculatorInput() in src/utils/parse-calculator-input.js.
 *
 * @param mixed $raw ID, embed code or link entered by the user.
 * @return string Calculator ID, or '' when the input isn't valid.
 */
function activecalculator_sanitize_id( $raw ) {
	if ( ! is_string( $raw ) ) {
		return '';
	}

	$input = trim( $raw );

	if ( preg_match( ACTIVECALCULATOR_ID_PATTERN, $input ) ) {
		return $input;
	}

	if ( false !== strpos( $input, '<' ) ) {
		if ( preg_match( '/data-calc-id\s*=\s*["\']([^"\']*)["\']/i', $input, $match ) ) {
			return preg_match( ACTIVECALCULATOR_ID_PATTERN, $match[1] ) ? $match[1] : '';
		}

		if ( preg_match_all( '/src\s*=\s*["\']([^"\']*)["\']/i', $input, $matches ) ) {
			foreach ( $matches[1] as $src ) {
				$id = activecalculator_sanitize_id( $src );
				if ( '' !== $id ) {
					return $id;
				}
			}
		}

		return '';
	}

	$url = wp_parse_url( false === strpos( $input, '://' ) ? 'https://' . $input : $input );

	if ( empty( $url['host'] ) || empty( $url['path'] ) ) {
		return '';
	}

	$host = strtolower( $url['host'] );

	if ( 'activecalculator.com' !== $host && ! str_ends_with( $host, '.activecalculator.com' ) ) {
		return '';
	}

	$segments = array_values( array_filter( explode( '/', $url['path'] ) ) );
	$last     = end( $segments );

	return ( false !== $last && preg_match( ACTIVECALCULATOR_ID_PATTERN, $last ) ) ? $last : '';
}

/**
 * Registers ActiveCalculator's embed script. It is enqueued only when a calculator is rendered.
 */
function activecalculator_register_embed_script() {
	wp_register_script(
		'activecalculator-embed',
		ACTIVECALCULATOR_APP_URL . '/embed.js',
		array(),
		null, // phpcs:ignore WordPress.WP.EnqueuedResourceParameters.MissingVersion -- Served and versioned by the ActiveCalculator service.
		array(
			'in_footer' => true,
			'strategy'  => 'defer',
		)
	);
}
add_action( 'init', 'activecalculator_register_embed_script' );

/**
 * Builds the embed markup for one calculator and enqueues the embed script.
 *
 * The return value is HTML; escape it at output with wp_kses( $html, activecalculator_allowed_html() ).
 *
 * @param string $id                 Calculator ID (already passed through activecalculator_sanitize_id()).
 * @param string $wrapper_attributes Escaped attributes for the wrapper div, e.g. from get_block_wrapper_attributes().
 * @return string Embed HTML, or '' when the ID isn't valid.
 */
function activecalculator_render_embed( $id, $wrapper_attributes = '' ) {
	$id = activecalculator_sanitize_id( $id );

	if ( '' === $id ) {
		return '';
	}

	wp_enqueue_script( 'activecalculator-embed' );

	if ( '' === $wrapper_attributes ) {
		$wrapper_attributes = 'class="activecalculator-embed"';
	}

	return sprintf(
		'<div %1$s data-calc-id="%2$s"><iframe src="%3$s" data-calculator-id="%2$s" title="%4$s" loading="lazy" width="100%%" height="%5$d" style="width:100%%;border:0;display:block"></iframe></div>',
		$wrapper_attributes,
		esc_attr( $id ),
		esc_url( ACTIVECALCULATOR_APP_URL . '/embed/' . rawurlencode( $id ) ),
		esc_attr__( 'Interactive calculator', 'activecalculator' ),
		ACTIVECALCULATOR_INITIAL_HEIGHT
	);
}

/**
 * Whether the page is being rendered inside the Elementor editor.
 *
 * Calculators aren't loaded there, because every load counts as an impression on the ActiveCalculator plan.
 *
 * @return bool
 */
function activecalculator_is_elementor_editor() {
	if ( ! did_action( 'elementor/loaded' ) || ! class_exists( '\Elementor\Plugin' ) ) {
		return false;
	}

	$elementor = \Elementor\Plugin::$instance;

	return ( isset( $elementor->editor ) && $elementor->editor->is_edit_mode() )
		|| ( isset( $elementor->preview ) && $elementor->preview->is_preview_mode() );
}

/**
 * Placeholder shown instead of a calculator inside a page builder's editor.
 *
 * @param string $id Calculator ID, or '' when none has been entered yet.
 * @return string Escaped HTML.
 */
function activecalculator_editor_placeholder( $id ) {
	if ( '' === $id ) {
		$message = esc_html__( 'Paste the calculator’s embed code, link or ID in the settings.', 'activecalculator' );
	} else {
		// Monospace with ligatures off: fonts like Inter turn the "x" in "4x0" into "×".
		$id_html = '<code style="font-family:monospace;font-variant:none">' . esc_html( $id ) . '</code>';

		$message = esc_html__( 'Your calculator appears here on the published page.', 'activecalculator' )
			. '<br><span style="font-size:0.875em;color:#646970">'
			. esc_html__( 'It isn’t loaded while you edit, so editing doesn’t count toward your impressions.', 'activecalculator' )
			. '<br>'
			/* translators: %s: calculator ID. */
			. sprintf( esc_html__( 'Calculator ID: %s', 'activecalculator' ), $id_html )
			. '</span>';
	}

	return '<div class="activecalculator-editor-placeholder" style="padding:24px;border:1px dashed #c3c4c7;border-radius:4px;text-align:center">'
		. '<strong>' . esc_html__( 'ActiveCalculator', 'activecalculator' ) . '</strong><br>'
		. $message
		. '</div>';
}

/**
 * HTML allowed in embed output. Used with wp_kses() wherever embed markup is echoed.
 *
 * @return array
 */
function activecalculator_allowed_html() {
	return array(
		'div'    => array(
			'id'           => true,
			'class'        => true,
			'style'        => true,
			'data-calc-id' => true,
		),
		'iframe' => array(
			'src'                => true,
			'title'              => true,
			'loading'            => true,
			'width'              => true,
			'height'             => true,
			'style'              => true,
			'data-calculator-id' => true,
		),
	);
}
