/**
 * Registers the ActiveCalculator block. The front end is rendered on the server by render.php,
 * so save() stores only the block's attributes.
 */
import { registerBlockType } from '@wordpress/blocks';

import Edit from './edit';
import deprecated from './deprecated';
import icon from './icon';
import metadata from './block.json';

registerBlockType( metadata.name, {
	icon,
	edit: Edit,
	save: () => null,
	deprecated,
} );
