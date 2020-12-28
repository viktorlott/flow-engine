
import { DefaultPortModel, NodeModel, PortModelAlignment } from '@projectstorm/react-diagrams';
import { CustomPortModel } from '../port/CustomPortModel';




export class CustomNodeModel extends NodeModel {
	constructor(config = {}) {
		super({
			type: 'block',
			...config,
			locked: false
		})



		if(!config.ports) {
			this.options.fields.forEach(field => {
				const { input, output } = field

				input && this.addPort(new CustomPortModel({ name: input.name, input: true, color: input.color, alignment: "left" }))
				output && this.addPort(new CustomPortModel({ name: output.name, input: false, color: output.color, alignment: "right" }))
			})
		} 

	}


	serialize(event) {
		return {
			...this.options,
			...super.serialize(),
		};
	}

	deserialize(ob, engine) {
		super.deserialize(ob, engine);
		for(let key in ob.data) {
			if(!(key in this.options)) {
				this.options[key] = ob.data[key]
			} 
		}
	}
}