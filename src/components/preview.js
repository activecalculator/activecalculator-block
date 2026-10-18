/**
 * Live calculator preview inside the block editor.
 *
 * Only mounted after the author clicks "Load preview", because every load counts as an impression
 * on the author's ActiveCalculator plan.
 */
import { __ } from '@wordpress/i18n';
import { Spinner } from '@wordpress/components';
import { useLayoutEffect, useRef, useState } from '@wordpress/element';

const APP_URL = 'https://app.activecalculator.com';
const INITIAL_HEIGHT = 480;

/**
 * @param {Object}  props
 * @param {string}  props.id         Calculator ID.
 * @param {boolean} props.isSelected Whether the block is selected. When it isn't, an overlay keeps clicks
 *                                   selecting the block instead of going into the calculator.
 */
export default function CalculatorPreview( { id, isSelected } ) {
	const iframeRef = useRef();
	const [ height, setHeight ] = useState( INITIAL_HEIGHT );
	const [ isLoaded, setIsLoaded ] = useState( false );

	// A layout effect runs in the same task that inserts the iframe, so the listener is in place before
	// the calculator can post its first height (the calculator only posts when its height changes).
	useLayoutEffect( () => {
		const iframe = iframeRef.current;
		// The editor canvas is itself an iframe, so listen on the window the preview lives in.
		const view = iframe?.ownerDocument?.defaultView;

		if ( ! view ) {
			return;
		}

		const onMessage = ( event ) => {
			if (
				event.origin !== APP_URL ||
				event.source !== iframe.contentWindow ||
				event.data?.action !== 'UPDATE_CALCULATOR_IFRAME_HEIGHT'
			) {
				return;
			}

			const nextHeight = parseInt( event.data.payload?.height, 10 );
			if ( nextHeight > 0 ) {
				setHeight( nextHeight );
			}
		};

		view.addEventListener( 'message', onMessage );
		return () => view.removeEventListener( 'message', onMessage );
	}, [ id ] );

	return (
		<div className="activecalculator-preview">
			<iframe
				ref={ iframeRef }
				src={ `${ APP_URL }/embed/${ encodeURIComponent( id ) }` }
				title={ __( 'ActiveCalculator preview', 'activecalculator' ) }
				style={ { height } }
				onLoad={ () => setIsLoaded( true ) }
			/>
			{ ! isLoaded && (
				<div className="activecalculator-preview__loading">
					<Spinner />
				</div>
			) }
			{ ! isSelected && (
				<div className="activecalculator-preview__overlay" />
			) }
		</div>
	);
}
