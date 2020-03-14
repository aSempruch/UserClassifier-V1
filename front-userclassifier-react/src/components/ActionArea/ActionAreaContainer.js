import React, { Component } from 'react'
import { Stage, Layer } from 'react-konva';
import Basket from './Basket';
import Ball from './Ball';

import { ACT_ENUM, BALL_ENUM, BASKET_POS, BALL_COUNT } from '../constants';
import { processRawMouseData, generateBalls } from '../utils';

export default class ActionAreaContainer extends Component {

	state = {
		balls: []
	}

	rawMouseData = {
		x: [],
		y: [],
		dragstart: [],
		dragend: [],
		timeIntervals: []
	}

	timer = null;

	componentDidMount() {

		const ballProps = {
			handleBallEvent: this.handleBallEvent.bind(this),
			mouseActivityHandler: this.mouseActivityHandler.bind(this),
			setActionState: this.props.setActionState
		}

		this.setState({
			balls: generateBalls().map(b => (
				React.cloneElement(b, ballProps)
			))
		});
	}
	
	componentDidUpdate(props) {

		// Data collection finished
		if(this.props.actionState === ACT_ENUM.ROUND_END && 
				props.actionState === ACT_ENUM.PLAY) { this.computeMouseData(); }
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
	}

	mouseActivityHandler(e) {
		// Only log data if proper action state
		shouldLog(this.props.actionState) && this.logMouse(e, this.rawMouseData)
	}


	handleBallEvent(e) {
		switch(e) {

			case BALL_ENUM.INITIAL_PICKED_UP:
				if(this.props.actionState === ACT_ENUM.WAIT) { this.props.setActionState(ACT_ENUM.PLAY); }
				this.timer = new Date();
				break;

			case BALL_ENUM.PLACED_IN_BASKET:
				this.rawMouseData.timeIntervals.push(new Date() - this.timer);
				break;
		}		
	}

	computeMouseData() {
		processRawMouseData(this.rawMouseData, this.ballPos);
	}

	render() {
		return (
			<Stage 
				width={window.innerWidth}
				height={window.innerHeight}
				onMouseMove={this.mouseActivityHandler.bind(this)}
			>
				<Layer>
					<Basket/>
					{this.state.balls}
					</Layer>
			</Stage>
		)
	}
}

const shouldLog = (actionState) => {
	return actionState === ACT_ENUM.PLAY;
}