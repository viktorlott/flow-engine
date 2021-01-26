import * as React from 'react';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';
import { CustomLinkModel } from './CustomLinkModel';

// import { DefaultLinkFactory } from './DefaultLinkFactory';

export class CustomLinkSegmentWidget extends React.Component {


	render() {
		const Bottom = React.cloneElement(
			this.props.factory.generateLinkSegment(
				this.props.link,
				this.props.selected,
				this.props.path,
				this.props.link.isSelected()
			),
			{
				ref: this.props.forwardRef,
				strokeWidth: 1.5,
				// stroke: "#a6a7b1" || "#8f909a"
			}
		);

		const Top = React.cloneElement(Bottom, {
			strokeLinecap: 'round',
			onMouseLeave: () => {
				this.props.onSelection(false);
			},
			onMouseEnter: () => {
				this.props.onSelection(true);
			},
			...this.props.extras,
			ref: null,
			'data-linkid': this.props.link.getID(),
			strokeOpacity: this.props.link.isSelected() ? 0.2 : 0,
			strokeWidth: 10,
			fill: 'none',
			onContextMenu: (event) => {
				if (!this.props.link.isLocked()) {
					event.preventDefault();
					this.props.link.remove();
				}
			}
		});

		return (
			<g>
				{Bottom}
				{Top}
			</g>
		);
	}
}

/* <defs>
<linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
<stop offset="0%" stop-color="#00bc9b" />
<stop offset="100%" stop-color="#5eaefd" />
</linearGradient>
</defs> */