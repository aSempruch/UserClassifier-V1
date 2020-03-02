import React, { Component } from 'react'
import { Stage, Layer } from 'react-konva';
import Basket from './Basket';
import Ball from './Ball';

export default class ActionAreaContainer extends Component {

	basketPos = {
		x: window.innerWidth/2,
		y: window.innerHeight/2
	}

	render() {
		return (
			<Stage width={window.innerWidth} height={window.innerHeight}>
				<Layer>
					<Basket basketPos={this.basketPos}/>
					<Ball basketPos={this.basketPos}/>
				</Layer>
			</Stage>
		)
	}
}
