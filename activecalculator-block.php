<?php
/**
 * Plugin Name:       ActiveCalculator.com Block
 * Description:       Block for embedding ActiveCalculator.com calculators
 * Requires at least: 6.1
 * Requires PHP:      7.0

 * Author:            Abdul Moiz
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       activecalculator-block
 *
 * @package           activecalculatorblock
 */

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function activecalculatorblock_activecalculator_block_block_init() {
	register_block_type( __DIR__ . '/build' );
}
add_action( 'init', 'activecalculatorblock_activecalculator_block_block_init' );

// Add the ActiveCalculator Resize script
// function enqueue_activecalculator_resizer() {
//     wp_enqueue_script(
//         'custom-block-script',
//         'https://bc.activecalculator.com/js/activecalculator-resizer.js',
//         array(),  // Add any dependencies here if needed
//         '1.0',    // Specify a version number
//         true      // Load the script in the footer
//     );
// }
// add_action('enqueue_block_assets', 'enqueue_activecalculator_resizer');


// Plugn Update Checker
// https://github.com/YahnisElsts/plugin-update-checker/
require 'plugin-update-checker/plugin-update-checker.php';
use YahnisElsts\PluginUpdateChecker\v5\PucFactory;

$myUpdateChecker = PucFactory::buildUpdateChecker(
	'https://github.com/activecalculator/activecalculator-block/',
	__FILE__,
	'activecalculator-block'
);

$myUpdateChecker->getVcsApi()->enableReleaseAssets();

//Set the branch that contains the stable release.
$myUpdateChecker->setBranch('main');

$myUpdateChecker->getVcsApi()->enableReleaseAssets();