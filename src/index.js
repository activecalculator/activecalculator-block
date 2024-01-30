/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
import { registerBlockType } from '@wordpress/blocks';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * All files containing `style` keyword are bundled together. The code used
 * gets applied both to the front of your site and to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './style.scss';

/**
 * Internal dependencies
 */
import Edit from './edit';
import save from './save';
import metadata from './block.json';

/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
registerBlockType(metadata.name, {
	icon: {
		foreground: '#0066FF',
		src: <svg width="458" height="458" viewBox="0 0 458 458" fill="none" xmlns="http://www.w3.org/2000/svg">
			<rect width="458" height="458" rx="229" fill="currentColor" />
      <path d="M140.103 231.357C139.658 233.301 139.507 235.281 139.507 237.275V334.393C139.507 358.55 114.687 374.215 97.8175 356.924C61.0268 319.214 52.1071 263.405 53.0682 234.278C65.3678 117.315 171.965 73.3258 229.705 74.0078V161.986C169.865 162.651 145.591 207.355 140.103 231.357Z" fill="white"></path>
      <path d="M318.897 231.357C319.342 233.301 319.493 235.281 319.493 237.275V334.393C319.493 358.55 344.313 374.215 361.183 356.924C397.973 319.214 406.893 263.405 405.932 234.278C393.632 117.315 287.035 73.3258 229.295 74.0078V161.986C289.135 162.651 313.409 207.355 318.897 231.357Z" fill="white"></path>
		</svg>
	},
	/**
	 * @see ./edit.js
	 */
	edit: Edit,

	/**
	 * @see ./save.js
	 */
	save,
});
