<?php
/**
 * Elementor widget that embeds an ActiveCalculator calculator.
 *
 * @package activecalculator
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * ActiveCalculator widget for Elementor.
 */
class ActiveCalculator_Elementor_Widget extends \Elementor\Widget_Base {

	/**
	 * Widget name.
	 *
	 * @return string
	 */
	public function get_name() {
		return 'activecalculator';
	}

	/**
	 * Widget title shown in the Elementor panel.
	 *
	 * @return string
	 */
	public function get_title() {
		return esc_html__( 'ActiveCalculator', 'activecalculator' );
	}

	/**
	 * Widget icon. The class is drawn by activecalculator_elementor_editor_styles().
	 *
	 * @return string
	 */
	public function get_icon() {
		return 'activecalculator-elementor-icon';
	}

	/**
	 * Panel category.
	 *
	 * @return string[]
	 */
	public function get_categories() {
		return array( 'general' );
	}

	/**
	 * Search keywords for the Elementor panel.
	 *
	 * @return string[]
	 */
	public function get_keywords() {
		return array( 'calculator', 'quote', 'price', 'estimate', 'activecalculator' );
	}

	/**
	 * Widget settings.
	 */
	protected function register_controls() {
		$this->start_controls_section(
			'content_section',
			array(
				'label' => esc_html__( 'Calculator', 'activecalculator' ),
				'tab'   => \Elementor\Controls_Manager::TAB_CONTENT,
			)
		);

		$this->add_control(
			'calculator',
			array(
				'label'       => esc_html__( 'Embed code, link or ID', 'activecalculator' ),
				'type'        => \Elementor\Controls_Manager::TEXT,
				'label_block' => true,
				'placeholder' => 'https://app.activecalculator.com/embed/…',
				'description' => esc_html__( 'Find it in ActiveCalculator under Share → Embed.', 'activecalculator' ),
				'ai'          => array( 'active' => false ),
			)
		);

		$this->end_controls_section();
	}

	/**
	 * Outputs the calculator. Inside the Elementor editor it shows a placeholder instead, because every
	 * calculator load counts as an impression on the ActiveCalculator plan.
	 */
	protected function render() {
		$settings = $this->get_settings_for_display();
		$id       = activecalculator_sanitize_id( isset( $settings['calculator'] ) ? $settings['calculator'] : '' );

		if ( activecalculator_is_elementor_editor() ) {
			echo wp_kses_post( activecalculator_editor_placeholder( $id ) );
			return;
		}

		if ( '' === $id ) {
			return;
		}

		echo wp_kses( activecalculator_render_embed( $id ), activecalculator_allowed_html() );
	}
}
