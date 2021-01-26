import {
	DiagramEngine,
	LabelModel,
	LinkModel,
	LinkModelGenerics,
	LinkModelListener,
	PortModel,
	PortModelAlignment
} from '@projectstorm/react-diagrams-core';
import { CustomLabelModel } from '../label/CustomLabelModel';
import { BezierCurve } from '@projectstorm/geometry';
import { BaseEntityEvent, BaseModelOptions, DeserializeEvent } from '@projectstorm/react-canvas-core';


export class CustomLinkModel extends LinkModel {
	constructor(options) {
		super({
			...options,
			type: 'default',
			width: 2 || options.width || 1 || 2,
			color: options.color || '#c7c7c7',
			selectedColor: options.selectedColor || "#c7c7c7" || 'rgb(0,192,255)',
			curvyness: 100,
		});

	}

	calculateControlOffset(port) {
		if (port.getOptions().alignment === PortModelAlignment.RIGHT) {
			return [this.options.curvyness, 0];
		} else if (port.getOptions().alignment === PortModelAlignment.LEFT) {
			return [-this.options.curvyness, 0];
		} else if (port.getOptions().alignment === PortModelAlignment.TOP) {
			return [0, -this.options.curvyness];
		}
		return [0, this.options.curvyness];
	}

	getSVGPath() {
		if (this.points.length == 2) {
			const curve = new BezierCurve();
			curve.setSource(this.getFirstPoint().getPosition());
			curve.setTarget(this.getLastPoint().getPosition());
			curve.setSourceControl(this.getFirstPoint().getPosition().clone());
			curve.setTargetControl(this.getLastPoint().getPosition().clone());

			if (this.sourcePort) {
				curve.getSourceControl().translate(...this.calculateControlOffset(this.getSourcePort()));
			}

			if (this.targetPort) {
				curve.getTargetControl().translate(...this.calculateControlOffset(this.getTargetPort()));
			}
			return curve.getSVGCurve();
		}
	}

	serialize() {
		return {
			...super.serialize(),
			width: this.options.width,
			color: this.options.color,
			curvyness: this.options.curvyness,
			selectedColor: this.options.selectedColor,

		};
	}

	deserialize(ob) {
		super.deserialize(ob, this.engine);
		this.options.color = ob.data.color;
		this.options.width = ob.data.width;
		this.options.curvyness = ob.data.curvyness;
		this.options.selectedColor = ob.data.selectedColor;
		for(let key in ob.data) {
			if(!(key in this.options)) {
				this.options[key] = ob.data[key]
			} 
		}
	}

	addLabel(label) {
		if (label instanceof LabelModel) {
			return super.addLabel(label);
		}
		let labelOb = new CustomLabelModel();
		labelOb.setLabel(label);
		return super.addLabel(labelOb);
	}

	setWidth(width) {
		this.options.width = width;
		this.fireEvent({ width }, 'widthChanged');
	}

	setColor(color) {
		this.options.color = color;
		this.fireEvent({ color }, 'colorChanged');
	}
}
