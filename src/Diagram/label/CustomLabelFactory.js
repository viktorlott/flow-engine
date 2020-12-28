
import * as React from 'react';
import { AbstractReactFactory, GenerateWidgetEvent } from '@projectstorm/react-canvas-core';
import { DiagramEngine } from '@projectstorm/react-diagrams';

import { CustomLabelModel } from './CustomLabelModel';
import { CustomLabelWidget } from './CustomLabelWidget';

export class CustomLabelFactory extends AbstractReactFactory {
	constructor() {
		super('editable-label');
	}

	generateModel() {
		return new CustomLabelModel();
	}

	generateReactWidget(event) {
		return <CustomLabelWidget model={event.model} />;
	}
}