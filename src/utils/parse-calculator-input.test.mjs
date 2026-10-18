/**
 * Unit tests for the calculator link/ID parser. Run with `npm run test:unit` (Node's built-in test runner).
 */
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

import { parseCalculatorInput } from './parse-calculator-input.js';

const CUID = 'clx1a2b3c4d5e6f7g8h9i0j1k';
const CUID2 = 'tz4a98xxat96iws9zmbrgj3a';
const UUID = '3f2b8c1e-9a4d-4e6b-8f1a-2c3d4e5f6a7b';

describe( 'parseCalculatorInput', () => {
	for ( const [ label, id ] of [
		[ 'a cuid', CUID ],
		[ 'a cuid2', CUID2 ],
		[ 'a uuid', UUID ],
	] ) {
		it( `accepts ${ label }`, () => {
			assert.deepEqual( parseCalculatorInput( id ), { id } );
		} );
	}

	it( 'trims surrounding whitespace', () => {
		assert.deepEqual( parseCalculatorInput( `  ${ CUID }\n` ), {
			id: CUID,
		} );
	} );

	it( 'reads the ID from an embed link', () => {
		assert.deepEqual(
			parseCalculatorInput(
				`https://app.activecalculator.com/embed/${ CUID }`
			),
			{ id: CUID }
		);
	} );

	it( 'reads the ID from a standalone share link with a query string', () => {
		assert.deepEqual(
			parseCalculatorInput(
				`https://calc.activecalculator.com/${ CUID2 }?utm_source=x`
			),
			{ id: CUID2 }
		);
	} );

	it( 'reads the ID from a link without a scheme', () => {
		assert.deepEqual(
			parseCalculatorInput( `app.activecalculator.com/embed/${ CUID }/` ),
			{ id: CUID }
		);
	} );

	it( 'flags a custom (slug) link on activecalculator.com', () => {
		assert.deepEqual(
			parseCalculatorInput(
				'https://calc.activecalculator.com/roofing-cost-estimator'
			),
			{ error: 'custom-link' }
		);
	} );

	it( 'rejects links on other sites', () => {
		assert.deepEqual(
			parseCalculatorInput( `https://example.com/embed/${ CUID }` ),
			{ error: 'invalid' }
		);
		assert.deepEqual(
			parseCalculatorInput(
				`https://activecalculator.com.evil.test/embed/${ CUID }`
			),
			{ error: 'invalid' }
		);
	} );

	it( 'reports empty input', () => {
		assert.deepEqual( parseCalculatorInput( '' ), { error: 'empty' } );
		assert.deepEqual( parseCalculatorInput( '   ' ), { error: 'empty' } );
		assert.deepEqual( parseCalculatorInput( undefined ), {
			error: 'empty',
		} );
	} );

	it( 'rejects plain text', () => {
		assert.deepEqual( parseCalculatorInput( 'hello world' ), {
			error: 'invalid',
		} );
	} );

	it( 'rejects values that could break out of an HTML attribute', () => {
		assert.deepEqual(
			parseCalculatorInput( `${ CUID }" onload="alert(1)` ),
			{ error: 'invalid' }
		);
		assert.deepEqual(
			parseCalculatorInput( `<script>${ CUID }</script>` ),
			{ error: 'invalid' }
		);
	} );

	it( 'rejects IDs that are too short or too long', () => {
		assert.deepEqual( parseCalculatorInput( 'abc123' ), {
			error: 'invalid',
		} );
		assert.deepEqual( parseCalculatorInput( 'a'.repeat( 33 ) ), {
			error: 'invalid',
		} );
	} );

	it( 'reads the ID from the embed code on Share → Embed', () => {
		assert.deepEqual(
			parseCalculatorInput(
				`<div data-calc-id="${ CUID }"></div>\n<script src="https://app.activecalculator.com/embed.js"></script>`
			),
			{ id: CUID }
		);
	} );

	it( 'reads the ID from the older iframe embed code', () => {
		assert.deepEqual(
			parseCalculatorInput(
				`<iframe src="https://app.activecalculator.com/embed/${ CUID2 }" title="ActiveCalculator" height="846"></iframe>`
			),
			{ id: CUID2 }
		);
	} );

	it( 'rejects embed code without a valid calculator ID', () => {
		assert.deepEqual(
			parseCalculatorInput(
				'<script src="https://app.activecalculator.com/embed.js"></script>'
			),
			{ error: 'invalid' }
		);
		assert.deepEqual(
			parseCalculatorInput(
				'<div data-calc-id="x" onload="alert(1)"></div>'
			),
			{ error: 'invalid' }
		);
	} );

	it( 'does not mistake a hyphenated name for an ID', () => {
		assert.deepEqual( parseCalculatorInput( 'roofing-cost-estimator' ), {
			error: 'invalid',
		} );
	} );
} );
