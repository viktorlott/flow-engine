import { DiagramEngine, PortModel } from '@projectstorm/react-diagrams';
import { AbstractModelFactory } from '@projectstorm/react-canvas-core';
import { CustomPortModel } from './CustomPortModel';


export class CustomPortFactory extends AbstractModelFactory {
	constructor() {
		super("block");

	}

	generateModel(config) {
		return new CustomPortModel(config.initialConfig)
	}
}