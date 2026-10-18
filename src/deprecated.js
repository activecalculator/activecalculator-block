/* eslint-disable react/no-unknown-property -- v1.0.0 markup must be reproduced byte for byte. */
/**
 * Earlier versions of the block, newest first.
 *
 * Each entry keeps its own attributes, supports and save() inline (deprecations don't inherit them, and
 * importing helpers could change their output later).
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-deprecation/
 */
import { useBlockProps } from '@wordpress/block-editor';

/**
 * Version 1.0.0 saved a static iframe into the post. This exact copy of its save() lets the editor
 * recognise those blocks and convert them to the server-rendered block without an "invalid content" warning.
 */
const v1 = {
	attributes: {
		id: {
			type: 'string',
			default: '',
		},
	},
	supports: {
		html: false,
	},
	save( { attributes } ) {
		const { id } = attributes;

		return (
			<div { ...useBlockProps.save() }>
				<iframe
					src={ `https://app.activecalculator.com/embed/${ id }` }
					title="ActiveCalculator"
					name="ActiveCalculator"
					height="846"
					style="width: 100%; border: none;"
					sandbox="allow-same-origin allow-forms allow-scripts allow-top-navigation-by-user-activation allow-popups"
					frameborder="0"
				></iframe>
			</div>
		);
	},
};

export default [ v1 ];
