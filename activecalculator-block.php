<?php
/**
 * Plugin Name:       ActiveCalculator – Price Calculator Builder
 * Plugin URI:        https://activecalculator.com/
 * Description:       Embed calculators built with ActiveCalculator using a block, shortcode or Elementor widget, and turn visitors into leads.
 * Version:           1.1.0
 * Requires at least: 6.3
 * Requires PHP:      7.4
 * Author:            Abdul Moiz
 * License:           GPLv2 or later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       activecalculator
 *
 * @package activecalculator
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

define( 'ACTIVECALCULATOR_VERSION', '1.1.0' );
define( 'ACTIVECALCULATOR_APP_URL', 'https://app.activecalculator.com' );

require_once __DIR__ . '/includes/embed.php';
require_once __DIR__ . '/includes/shortcode.php';
require_once __DIR__ . '/includes/compat.php';
require_once __DIR__ . '/includes/elementor.php';

/**
 * Registers the block from build/block.json. The block renders on the server through build/render.php.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function activecalculator_register_block() {
	register_block_type( __DIR__ . '/build' );
}
add_action( 'init', 'activecalculator_register_block' );
