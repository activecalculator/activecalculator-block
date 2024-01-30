/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __, _x } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-block-editor/#useBlockProps
 */
import { BlockIcon, useBlockProps } from '@wordpress/block-editor';
import { Button, Path, Placeholder, Rect, SVG } from '@wordpress/components';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */

export const icon = {
  foreground: '#0066FF',
  src: (
    <SVG width="458" height="458" viewBox="0 0 458 458" fill="none" xmlns="http://www.w3.org/2000/svg">
      <Rect width="458" height="458" rx="229" fill="currentColor" />
      <Path d="M140.103 231.357C139.658 233.301 139.507 235.281 139.507 237.275V334.393C139.507 358.55 114.687 374.215 97.8175 356.924C61.0268 319.214 52.1071 263.405 53.0682 234.278C65.3678 117.315 171.965 73.3258 229.705 74.0078V161.986C169.865 162.651 145.591 207.355 140.103 231.357Z" fill="white"></Path>
      <Path d="M318.897 231.357C319.342 233.301 319.493 235.281 319.493 237.275V334.393C319.493 358.55 344.313 374.215 361.183 356.924C397.973 319.214 406.893 263.405 405.932 234.278C393.632 117.315 287.035 73.3258 229.295 74.0078V161.986C289.135 162.651 313.409 207.355 318.897 231.357Z" fill="white"></Path>
    </SVG>
  ),
};

export default function Edit(props) {
  const { attributes, setAttributes } = props;
  const { id } = attributes;

  return (
    <div
      {...useBlockProps({ className: "my-awesome-class" })}
    >
      <Placeholder
        icon={<BlockIcon icon={icon} showColors />}
        label="ActiveCalculator"
        className="wp-block-embed"
        instructions={__(
          'Enter the ID of the calculator you want to embed.'
        )}
      >
        <form onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            value={id}
            className="components-placeholder__input"
            aria-label={__('Calculator ID')}
            placeholder={__('Enter Calculator ID')}
            onChange={(e) => setAttributes({ id: e.target.value })}
          />
          <Button variant="primary" type="submit">
            {_x('Save', 'button label')}
          </Button>
        </form>
        {/* <div className="wp-block-embed__learn-more">
          <ExternalLink
            href={__(
              'https://wordpress.org/documentation/article/embeds/'
            )}
          >
            {__('Learn more about embeds')}
          </ExternalLink>
        </div> */}
        {/* {cannotEmbed && (
        <div className="components-placeholder__error">
          <div className="components-placeholder__instructions">
            {__('Sorry, this content could not be embedded.')}
          </div>
          <Button variant="secondary" onClick={tryAgain}>
            {_x('Try again', 'button label')}
          </Button>{' '}
          <Button variant="secondary" onClick={fallback}>
            {_x('Convert to link', 'button label')}
          </Button>
        </div>
      )} */}
      </Placeholder>
    </div>
  );
}

