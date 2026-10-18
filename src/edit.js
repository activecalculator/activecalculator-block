/**
 * Block editor UI: paste a calculator's embed code, link or ID, then optionally load a live preview.
 */
import { __, sprintf } from '@wordpress/i18n';
import {
	BlockControls,
	BlockIcon,
	InspectorControls,
	useBlockProps,
} from '@wordpress/block-editor';
import {
	Button,
	ExternalLink,
	Notice,
	PanelBody,
	Placeholder,
	ToolbarButton,
	ToolbarGroup,
} from '@wordpress/components';
import { useInstanceId } from '@wordpress/compose';
import { useState } from '@wordpress/element';

import CalculatorPreview from './components/preview';
import icon from './icon';
import { parseCalculatorInput } from './utils/parse-calculator-input';
import './editor.scss';

const CREATE_CALCULATOR_URL =
	'https://activecalculator.com/?utm_source=wordpress&utm_medium=plugin&utm_campaign=block-empty-state';

function getErrorMessage( error ) {
	switch ( error ) {
		case 'empty':
			return __(
				'Paste the calculator’s embed code, link or ID.',
				'activecalculator'
			);
		case 'custom-link':
			return __(
				'This link uses a custom name, so it doesn’t include the calculator ID. Copy the embed code from Share → Embed in ActiveCalculator instead.',
				'activecalculator'
			);
		default:
			return __(
				'That doesn’t look like ActiveCalculator embed code, a calculator link or an ID.',
				'activecalculator'
			);
	}
}

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const { id } = attributes;
	const [ isEditing, setIsEditing ] = useState( ! id );
	const [ value, setValue ] = useState( id );
	const [ error, setError ] = useState( null );
	const [ showPreview, setShowPreview ] = useState( false );
	const inputId = useInstanceId( Edit, 'activecalculator-input' );
	const blockProps = useBlockProps();

	const startReplacing = () => {
		setValue( id );
		setError( null );
		setShowPreview( false );
		setIsEditing( true );
	};

	const onSubmit = ( event ) => {
		event.preventDefault();
		const result = parseCalculatorInput( value );

		if ( result.error ) {
			setError( result.error );
			return;
		}

		setError( null );
		setValue( result.id );
		setAttributes( { id: result.id } );
		setShowPreview( false );
		setIsEditing( false );
	};

	if ( isEditing || ! id ) {
		return (
			<div { ...blockProps }>
				<Placeholder
					icon={ <BlockIcon icon={ icon } showColors /> }
					label={ __( 'ActiveCalculator', 'activecalculator' ) }
					instructions={ __(
						'Paste the embed code, link or ID of the calculator you want to add. You’ll find them in ActiveCalculator under Share → Embed.',
						'activecalculator'
					) }
					className="activecalculator-placeholder"
				>
					<form
						className="activecalculator-placeholder__form"
						onSubmit={ onSubmit }
					>
						<label
							htmlFor={ inputId }
							className="activecalculator-placeholder__label"
						>
							{ __(
								'Embed code, link or ID',
								'activecalculator'
							) }
						</label>
						<div className="activecalculator-placeholder__row">
							<input
								id={ inputId }
								type="text"
								className="components-placeholder__input activecalculator-placeholder__input"
								value={ value }
								placeholder="https://app.activecalculator.com/embed/…"
								aria-invalid={ !! error }
								onChange={ ( event ) => {
									setValue( event.target.value );
									setError( null );
								} }
							/>
							<Button variant="primary" type="submit">
								{ __( 'Embed', 'activecalculator' ) }
							</Button>
							{ !! id && (
								<Button
									variant="tertiary"
									onClick={ () => {
										setError( null );
										setIsEditing( false );
									} }
								>
									{ __( 'Cancel', 'activecalculator' ) }
								</Button>
							) }
						</div>
					</form>
					{ error && (
						<Notice
							status="error"
							isDismissible={ false }
							className="activecalculator-placeholder__error"
						>
							{ getErrorMessage( error ) }
						</Notice>
					) }
					<p className="activecalculator-placeholder__note">
						{ __(
							'Don’t have a calculator yet?',
							'activecalculator'
						) }{ ' ' }
						<ExternalLink href={ CREATE_CALCULATOR_URL }>
							{ __( 'Create one free', 'activecalculator' ) }
						</ExternalLink>
					</p>
				</Placeholder>
			</div>
		);
	}

	return (
		<>
			<BlockControls>
				<ToolbarGroup>
					{ showPreview && (
						<ToolbarButton
							onClick={ () => setShowPreview( false ) }
						>
							{ __( 'Hide preview', 'activecalculator' ) }
						</ToolbarButton>
					) }
					<ToolbarButton onClick={ startReplacing }>
						{ __( 'Replace', 'activecalculator' ) }
					</ToolbarButton>
				</ToolbarGroup>
			</BlockControls>
			<InspectorControls>
				<PanelBody title={ __( 'Calculator', 'activecalculator' ) }>
					<p>
						{ __( 'Calculator ID', 'activecalculator' ) }
						<br />
						<code>{ id }</code>
					</p>
					<Button variant="secondary" onClick={ startReplacing }>
						{ __( 'Replace calculator', 'activecalculator' ) }
					</Button>
				</PanelBody>
			</InspectorControls>
			<div { ...blockProps }>
				{ showPreview ? (
					<CalculatorPreview id={ id } isSelected={ isSelected } />
				) : (
					<Placeholder
						icon={ <BlockIcon icon={ icon } showColors /> }
						label={ __( 'ActiveCalculator', 'activecalculator' ) }
						instructions={ sprintf(
							/* translators: %s: calculator ID. */
							__(
								'Calculator %s will show here on the published page.',
								'activecalculator'
							),
							id
						) }
						className="activecalculator-placeholder"
					>
						<Button
							variant="secondary"
							onClick={ () => setShowPreview( true ) }
						>
							{ __( 'Load preview', 'activecalculator' ) }
						</Button>
						<p className="activecalculator-placeholder__note">
							{ __(
								'Loading a preview counts as 1 impression on your ActiveCalculator plan.',
								'activecalculator'
							) }
						</p>
					</Placeholder>
				) }
			</div>
		</>
	);
}
