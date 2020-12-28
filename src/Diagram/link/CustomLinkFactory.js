import * as React from 'react'
import { CustomLinkModel } from './CustomLinkModel'
import { CustomLinkWidget } from './CustomLinkWidget'
import styled, { css, keyframes } from 'styled-components'
import { AbstractReactFactory } from '@projectstorm/react-canvas-core'
import { DiagramEngine } from '@projectstorm/react-diagrams-core'


export const Keyframes = keyframes`
	from {
		stroke-dashoffset: 24;
	}
	to {
		stroke-dashoffset: 0;
	}
`;

const selected = css`
	stroke-dasharray: 10, 2;
	animation: ${Keyframes} 1s linear infinite;
`;


export const Path = styled.path`
	${props => props.active && selected};
	fill: none;
	pointer-events: all;
`;


export class CustomLinkFactory extends AbstractReactFactory {
	constructor(type = 'default') {
		super(type)
	}

	generateReactWidget(event) {
		return <CustomLinkWidget link={event.model} diagramEngine={this.engine} />
	}	

	generateModel(config) {
		return new CustomLinkModel(config.initialConfig) 
	}

	generateLinkSegment(model, selected, path, active) {

		return (
			<Path
				active={selected || active}
				selected={selected}
				stroke={selected || active ? model.getOptions().selectedColor : model.getOptions().color}
				strokeWidth={selected ? model.getOptions().width + 0 :  model.getOptions().width + 0}
				d={path}
			/>
		);
	}
}
