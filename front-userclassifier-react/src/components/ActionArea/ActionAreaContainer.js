import React, { Component } from 'react'
import { Stage, Layer } from 'react-konva';
import Basket from './Basket';
import Ball from './Ball';

import { ACT_ENUM } from '../constants';
import { processRawMouseData } from '../utils';

export default class ActionAreaContainer extends Component {

	basketPos = {
		x: window.innerWidth/2,
		y: window.innerHeight/2
	}

	ballPos = {
		x: window.innerWidth/2+200,
		y: window.innerHeight/2-140
	}
	
	rawMouseData = {
		x: [],
		y: [],
		dragstart: [],
		dragend: []
	}

	logMouse(e, rawMouseData) {
		switch(e.type) {
			case "mousemove":
			case "dragmove":
				rawMouseData.x.push(e.evt.layerX);
				rawMouseData.y.push(e.evt.layerY);
				break;
			case "dragstart":
				rawMouseData.dragstart.push(rawMouseData.x.length);
				break;
			case "dragend":
				rawMouseData.dragend.push(rawMouseData.x.length-1);
				break;
			default:
				console.error("ActionAreaContainer.js: Unexpected mouse event \"" + e.type + "\" on track");
		}
		// console.log(e.type);
	}

	componentDidUpdate(props) {

		// Data collection finished
		if(this.props.actionState === ACT_ENUM.ROUND_END && 
				props.actionState === ACT_ENUM.PLAY) { this.computeMouseData(); }
	}

	computeMouseData() {
		processRawMouseData(this.rawMouseData, this.basketPos, this.ballPos);
	}

	render() {

		// Only log data if proper action state
		const mouseActivityHandler = (e) => shouldLog(this.props.actionState) && this.logMouse(e, this.rawMouseData);

		return (
			<Stage 
				width={window.innerWidth}
				height={window.innerHeight}
				onMouseMove={mouseActivityHandler}
			>
				<Layer>
					<Basket 
						basketPos={this.basketPos}
					/>
					<Ball
						ballPos={this.ballPos}
						basketPos={this.basketPos}
						mouseActivityHandler={mouseActivityHandler}
						setActionState={this.props.setActionState}
						/>
					</Layer>
			</Stage>
		)
	}
}

const shouldLog = (actionState) => {
	return actionState === ACT_ENUM.PLAY;
}