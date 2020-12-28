import { LinkModel, PortModel, DefaultPortModel, DefaultLinkModel, PortModelAlignment } from '@projectstorm/react-diagrams';
import { CustomLabelModel } from '../label/CustomLabelModel';
import { CustomLinkModel } from '../link/CustomLinkModel';

export class CustomPortModel extends PortModel {
	constructor(options) {
		super({
			type: 'block',
			...options
		})




	}

	canLinkToPort(port) {
        if (port instanceof CustomPortModel) {
			/**
			 * From: this
			 * To: port
			 * Can this port connect to target port?
			 * 
			 * !this.getOptions().input            &&          port.getOptions().input
			 *   	\__ Can only drag from a ouput port 			\___ To a input port 
			 *     
			 */
			return !this.getOptions().input && port.getOptions().input
			
		}
		
        return true;
	}
	
	serialize() {
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



	createLinkModel(config) {
		const link = new CustomLinkModel({})
		return link
	}
}