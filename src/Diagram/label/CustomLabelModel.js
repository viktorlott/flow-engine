import { LabelModel } from '@projectstorm/react-diagrams';
import { BaseModelOptions, DeserializeEvent } from '@projectstorm/react-canvas-core';


export class CustomLabelModel extends LabelModel {

	constructor(options) {
		super({
			...options,
			type: 'editable-label'
		});
		this.value = options.value || '';
	}

	serialize() {
		return {
			...super.serialize(),
			value: this.value
		};
	}

	deserialize(event) {
		super.deserialize(event);
		this.value = event.data.value;
	}
}