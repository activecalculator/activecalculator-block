/**
 * Calculator IDs are cuid/cuid2 (20–32 letters and digits) or a uuid. Hyphenated words such as a custom
 * link name ("roofing-cost-estimator") must not match. Kept in sync with ACTIVECALCULATOR_ID_PATTERN in
 * includes/embed.php.
 */
export const CALCULATOR_ID_PATTERN =
	/^(?:[a-z0-9]{20,32}|[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})$/i;

/**
 * Finds the calculator ID in pasted embed code: the current snippet from Share → Embed
 * (<div data-calc-id="…">) or the older iframe snippet (<iframe src=".../embed/…">).
 *
 * @param {string} code Pasted HTML.
 * @return {{id: string}|{error: 'invalid'}} The ID, or an error when the code holds no valid ID.
 */
function parseEmbedCode( code ) {
	const dataId = code.match( /data-calc-id\s*=\s*["']([^"']*)["']/i );
	if ( dataId ) {
		return CALCULATOR_ID_PATTERN.test( dataId[ 1 ] )
			? { id: dataId[ 1 ] }
			: { error: 'invalid' };
	}

	for ( const [ , src ] of code.matchAll( /src\s*=\s*["']([^"']*)["']/gi ) ) {
		const result = parseCalculatorInput( src );
		if ( result.id ) {
			return result;
		}
	}

	return { error: 'invalid' };
}

/**
 * Turns what the user pasted into a calculator ID.
 *
 * Accepts a bare ID, the embed code from Share → Embed, or a link on activecalculator.com (or a subdomain)
 * whose last path segment is the ID, such as https://app.activecalculator.com/embed/{id}.
 *
 * @param {string} value Text the user entered.
 * @return {{id: string}|{error: 'empty'|'custom-link'|'invalid'}} The ID, or why it couldn't be found.
 */
export function parseCalculatorInput( value ) {
	const input = ( value || '' ).trim();

	if ( ! input ) {
		return { error: 'empty' };
	}

	if ( CALCULATOR_ID_PATTERN.test( input ) ) {
		return { id: input };
	}

	if ( input.includes( '<' ) ) {
		return parseEmbedCode( input );
	}

	let url;
	try {
		url = new URL( input.includes( '://' ) ? input : `https://${ input }` );
	} catch {
		return { error: 'invalid' };
	}

	const host = url.hostname.toLowerCase();
	if (
		host !== 'activecalculator.com' &&
		! host.endsWith( '.activecalculator.com' )
	) {
		return { error: 'invalid' };
	}

	const segments = url.pathname.split( '/' ).filter( Boolean );
	const last = segments[ segments.length - 1 ] || '';

	if ( CALCULATOR_ID_PATTERN.test( last ) ) {
		return { id: last };
	}

	return { error: 'custom-link' };
}
