import * as React from 'react';
import { DiagramEngine, LinkWidget, PointModel } from '@projectstorm/react-diagrams-core';
import { CustomLinkModel } from './CustomLinkModel';
import { CusomLinkPointWidget } from './CusomLinkPointWidget';
import { CustomLinkSegmentWidget } from './CustomLinkSegmentWidget';
import { MouseEvent } from 'react';


export class CustomLinkWidget extends React.Component{


	constructor(props) {
		super(props);
		this.refPaths = [];
		this.state = {
			selected: false,
			active: false
		}

		if(props.link) {
			props.link.widget = this
        }


	}

	componentDidUpdate() {
		this.props.link.setRenderedPaths(
			this.refPaths.map((ref) => {
				return ref.current;
			})
		);
	}

	componentDidMount() {
		this.props.link.setRenderedPaths(
			this.refPaths.map((ref) => {
				return ref.current;
			})
		);
	}

	componentWillUnmount() {
		this.props.link.setRenderedPaths([]);
	}

	setActive = val => void this.setState({ active: val })

	addPointToLink(event, index) {
		if (
			!event.shiftKey &&
			!this.props.link.isLocked() &&
			this.props.link.getPoints().length - 1 <= this.props.diagramEngine.getMaxNumberPointsPerLink()
		) {
			const point = new PointModel({
				link: this.props.link,
				position: this.props.diagramEngine.getRelativeMousePoint(event)
			});
			this.props.link.addPoint(point, index);
			event.persist();
			event.stopPropagation();
			this.forceUpdate(() => {
				this.props.diagramEngine.getActionEventBus().fireAction({
					event,
					model: point
				});
			});
		}
	}

	generatePoint(point){
		return (
			<CusomLinkPointWidget
				key={point.getID()}
				point={point}
				colorSelected={this.props.link.getOptions().selectedColor}
				color={this.props.link.getOptions().color}
			/>
		);
	}

	generateLink(path, extraProps, id) {
		const ref = React.createRef();
		this.refPaths.push(ref);


		return (
			<CustomLinkSegmentWidget
				key={`link-${id}`}
				path={path}
				selected={this.state.selected || this.state.active}
				active={this.state.active}
				diagramEngine={this.props.diagramEngine}
				factory={this.props.diagramEngine.getFactoryForLink(this.props.link)}
				link={this.props.link}
				forwardRef={ref}
				onSelection={(selected) => {
					this.setState({ selected: selected });
				}}
				extras={extraProps}
			/>
		);
	}

	render() {
		//ensure id is present for all points on the path
		var points = this.props.link.getPoints();
		var paths = [];
		this.refPaths = [];

		if (points.length === 2) {
			paths.push(
				this.generateLink(
					this.props.link.getSVGPath(),
					{
						onMouseDown: (event) => {
							this.addPointToLink(event, 1);
							return 
						}
					},
					'0'
				)
			);

			// draw the link as dangeling
			if (this.props.link.getTargetPort() == null) {
				paths.push(this.generatePoint(points[1]));
			}
		} else {
			//draw the multiple anchors and complex line instead
			for (let j = 0; j < points.length - 1; j++) {
				paths.push(
					this.generateLink(
						LinkWidget.generateLinePath(points[j], points[j + 1]),
						{
							'data-linkid': this.props.link.getID(),
							'data-point': j,
							onMouseDown: (event) => {
								this.addPointToLink(event, j + 1);
							},
						},
						j
					)
				);
			}

			// render the circles
			for (let i = 1; i < points.length - 1; i++) {
				paths.push(this.generatePoint(points[i]));
			}

			if (this.props.link.getTargetPort() == null) {
				paths.push(this.generatePoint(points[points.length - 1]));
			}
		}

		return <g data-default-link-test={this.props.link.getOptions().testName}>{paths}</g>;
	}
}
