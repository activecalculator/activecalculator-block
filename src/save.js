/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-block-editor/#useBlockProps
 */
import { useBlockProps } from '@wordpress/block-editor';

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#save
 *
 * @return {WPElement} Element to render.
 */

export default function save(props) {
  const { attributes } = props;
  const { id } = attributes;
  
  return (
    <div 
      {...useBlockProps.save()}
    >
      <iframe
        src={`https://app.activecalculator.com/embed/${id}`}
        title="ActiveCalculator"
        name="ActiveCalculator"
        height="846"
        style="width: 100%; border: none;"
        sandbox="allow-same-origin allow-forms allow-scripts allow-top-navigation-by-user-activation allow-popups"
        frameborder="0"
      >
      </iframe>
    </div>
  );
}

